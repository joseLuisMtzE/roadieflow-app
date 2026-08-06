import Link from "next/link";
import { Plus } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function EventsPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === Role.ADMIN;

  const events = await getDb().event.findMany({
    orderBy: { date: "asc" },
    select: {
      id: true,
      title: true,
      date: true,
      locationName: true,
      city: true,
      artist: { select: { name: true } },
    },
  });

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title="Eventos"
        description="Conciertos y fechas de la gira."
      />

      {isAdmin ? (
        <div className="flex flex-wrap gap-3 px-[var(--spacing-margin-mobile)]">
          <ButtonLink href="/events/new" size="lg">
            <Plus aria-hidden />
            Nuevo evento
          </ButtonLink>
          <ButtonLink href="/artists" variant="outline" size="lg">
            Artistas
          </ButtonLink>
        </div>
      ) : null}

      <section className="flex flex-col gap-3 px-[var(--spacing-margin-mobile)]">
        {events.length === 0 ? (
          <p className="text-body-md text-muted-foreground">
            No hay eventos registrados.
          </p>
        ) : (
          events.map((event) => (
            <article
              key={event.id}
              className="glass-surface relative rounded-2xl px-4 py-4 shadow-[inset_0_0_0_1px_var(--ghost-border)]"
            >
              <Link
                href={`/events/${event.id}`}
                aria-label={`Ver evento ${event.title}`}
                className="absolute inset-0 rounded-2xl"
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="pointer-events-none min-w-0 flex-1 space-y-1">
                  <h2 className="truncate text-base font-medium">
                    {event.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {event.artist.name} · {event.city}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.locationName}
                  </p>
                  <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    {formatEventDate(event.date)}
                  </p>
                </div>
                {isAdmin ? (
                  <ButtonLink
                    href={`/events/${event.id}/edit`}
                    variant="outline"
                    size="sm"
                    className="relative z-10"
                  >
                    Editar
                  </ButtonLink>
                ) : null}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
