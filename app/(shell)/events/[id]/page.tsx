import { notFound } from "next/navigation";
import { Building2, Bus, Plane, Pencil } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {
  LogisticsType,
  Role,
  type Status,
} from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const typeMeta: Record<LogisticsType, { label: string; icon: typeof Plane }> = {
  FLIGHT: { label: "Vuelo", icon: Plane },
  HOTEL: { label: "Hotel", icon: Building2 },
  TRANSFER: { label: "Traslado", icon: Bus },
};

const statusLabel: Record<Status, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  COMPLETED: "Completado",
  CANCELED: "Cancelado",
};

function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

function formatLogisticsTime(date: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function logisticsSummary(
  type: LogisticsType,
  details: Record<string, unknown>,
): string {
  if (type === LogisticsType.FLIGHT) {
    const flight = stringField(details, "flightNumber");
    const from = stringField(details, "from");
    const to = stringField(details, "to");
    return flight && from && to ? `${flight} · ${from} → ${to}` : "Vuelo";
  }

  if (type === LogisticsType.HOTEL) {
    return stringField(details, "name") ?? "Hotel";
  }

  const from = stringField(details, "from");
  const to = stringField(details, "to");
  return from && to ? `${from} → ${to}` : "Traslado";
}

function stringField(
  details: Record<string, unknown>,
  key: string,
): string | null {
  const value = details[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const session = await auth();
  const isAdmin = session?.user?.role === Role.ADMIN;
  const { id } = await params;

  const event = await getDb().event.findUnique({
    where: { id },
    include: {
      artist: { select: { name: true } },
      logistics: { orderBy: { startTime: "asc" } },
    },
  });

  if (!event) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title={event.title}
        description={`${event.artist.name} · ${event.city}`}
      />

      <section className="space-y-2 px-[var(--spacing-margin-mobile)]">
        <p className="text-body-md text-muted-foreground">
          {event.locationName}
        </p>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {formatEventDate(event.date)}
        </p>
      </section>

      {isAdmin ? (
        <div className="flex flex-wrap gap-3 px-[var(--spacing-margin-mobile)]">
          <ButtonLink
            href={`/events/${event.id}/edit`}
            variant="outline"
            size="lg"
          >
            <Pencil aria-hidden />
            Editar evento
          </ButtonLink>
          <ButtonLink
            href={`/events/${event.id}/logistics/flight/new`}
            variant="outline"
            size="lg"
          >
            <Plane aria-hidden />
            Vuelo
          </ButtonLink>
          <ButtonLink
            href={`/events/${event.id}/logistics/hotel/new`}
            variant="outline"
            size="lg"
          >
            <Building2 aria-hidden />
            Hotel
          </ButtonLink>
          <ButtonLink
            href={`/events/${event.id}/logistics/transfer/new`}
            variant="outline"
            size="lg"
          >
            <Bus aria-hidden />
            Traslado
          </ButtonLink>
        </div>
      ) : null}

      <section className="flex flex-col gap-3 px-[var(--spacing-margin-mobile)]">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Logística
        </h2>
        {event.logistics.length === 0 ? (
          <p className="text-body-md text-muted-foreground">
            Sin logística registrada para este evento.
          </p>
        ) : (
          event.logistics.map((item) => {
            const meta = typeMeta[item.type];
            const Icon = meta.icon;
            const details =
              item.details &&
              typeof item.details === "object" &&
              !Array.isArray(item.details)
                ? (item.details as Record<string, unknown>)
                : {};

            return (
              <article
                key={item.id}
                className="glass-surface rounded-2xl px-4 py-4 shadow-[inset_0_0_0_1px_var(--ghost-border)]"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-2xl bg-card/80 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                        {meta.label}
                      </p>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.65rem] tracking-wide uppercase",
                          item.status === "CONFIRMED" &&
                            "bg-primary/15 text-primary",
                          item.status === "PENDING" &&
                            "bg-card text-muted-foreground",
                          item.status === "COMPLETED" &&
                            "bg-secondary/20 text-secondary",
                          item.status === "CANCELED" &&
                            "bg-destructive/15 text-destructive",
                        )}
                      >
                        {statusLabel[item.status]}
                      </span>
                    </div>
                    <p className="text-base font-medium">
                      {logisticsSummary(item.type, details)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatLogisticsTime(item.startTime)}
                    </p>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
