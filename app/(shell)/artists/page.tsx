import { Plus } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function ArtistsPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === Role.ADMIN;

  const artists = await getDb().artist.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      genre: true,
      _count: { select: { events: true } },
    },
  });

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title="Artistas"
        description="Artistas de la gira — gestión para administradores."
      />

      {isAdmin ? (
        <div className="px-[var(--spacing-margin-mobile)]">
          <ButtonLink href="/artists/new" size="lg">
            <Plus aria-hidden />
            Nuevo artista
          </ButtonLink>
        </div>
      ) : null}

      <section className="flex flex-col gap-3 px-[var(--spacing-margin-mobile)]">
        {artists.length === 0 ? (
          <p className="text-body-md text-muted-foreground">
            No hay artistas registrados.
          </p>
        ) : (
          artists.map((artist) => (
            <article
              key={artist.id}
              className="glass-surface rounded-2xl px-4 py-4 shadow-[inset_0_0_0_1px_var(--ghost-border)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <h2 className="truncate text-base font-medium">
                    {artist.name}
                  </h2>
                  {artist.genre ? (
                    <p className="text-sm text-muted-foreground">
                      {artist.genre}
                    </p>
                  ) : null}
                  <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    {artist._count.events}{" "}
                    {artist._count.events === 1 ? "evento" : "eventos"}
                  </p>
                </div>
                {isAdmin ? (
                  <ButtonLink
                    href={`/artists/${artist.id}/edit`}
                    variant="outline"
                    size="sm"
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
