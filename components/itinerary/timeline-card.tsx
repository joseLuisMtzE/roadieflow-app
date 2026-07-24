import { Building2, Bus, Mic2, Plane, type LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LogisticsType, Status } from "@/lib/generated/prisma/client";
import type { TimelineItem } from "@/lib/itinerary/timeline";
import { cn } from "@/lib/utils";

const timeFormatter = new Intl.DateTimeFormat("es-MX", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Mexico_City",
});

const logisticsMeta: Record<
  LogisticsType,
  { label: string; icon: LucideIcon; accent: string }
> = {
  FLIGHT: {
    label: "Vuelo",
    icon: Plane,
    accent: "text-primary",
  },
  HOTEL: {
    label: "Hotel",
    icon: Building2,
    accent: "text-secondary",
  },
  TRANSFER: {
    label: "Traslado",
    icon: Bus,
    accent: "text-muted-foreground",
  },
};

const statusLabel: Record<Status, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  COMPLETED: "Completado",
  CANCELED: "Cancelado",
};

type TimelineCardProps = {
  item: TimelineItem;
};

export function TimelineCard({ item }: TimelineCardProps) {
  if (item.kind === "show") {
    return (
      <Card className="bg-muted/80 shadow-none">
        <CardHeader className="gap-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Mic2 className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-label-md uppercase tracking-wide text-muted-foreground">
                  Show · {timeFormatter.format(item.at)}
                </p>
                <CardTitle className="truncate">{item.title}</CardTitle>
              </div>
            </div>
          </div>
          <CardDescription className="editorial-offset">
            {item.locationName} · {item.city}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-body-md text-muted-foreground">
            {item.artistName}
          </p>
        </CardContent>
      </Card>
    );
  }

  const meta = logisticsMeta[item.type];
  const Icon = meta.icon;
  const headline = logisticsHeadline(item.type, item.details);
  const subline = logisticsSubline(item.type, item.details);

  return (
    <Card className="bg-muted/80 shadow-none">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={cn(
                "inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-2xl bg-card/80",
                meta.accent,
              )}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-label-md uppercase tracking-wide text-muted-foreground">
                {meta.label} · {timeFormatter.format(item.at)}
              </p>
              <CardTitle className="truncate">{headline}</CardTitle>
            </div>
          </div>
          <StatusPill status={item.status} />
        </div>
        {subline ? (
          <CardDescription className="editorial-offset">
            {subline}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="font-mono text-label-md text-muted-foreground">
          {item.eventTitle} · {item.city}
        </p>
      </CardContent>
    </Card>
  );
}

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-3 py-1 font-mono text-label-md uppercase tracking-wide",
        status === "CONFIRMED" && "bg-primary/15 text-primary",
        status === "PENDING" && "bg-card text-muted-foreground",
        status === "COMPLETED" && "bg-secondary/20 text-secondary",
        status === "CANCELED" && "bg-destructive/15 text-destructive",
      )}
    >
      {statusLabel[status]}
    </span>
  );
}

function logisticsHeadline(
  type: LogisticsType,
  details: Record<string, unknown>,
): string {
  if (type === "FLIGHT") {
    const flight = stringField(details, "flightNumber");
    const from = stringField(details, "from");
    const to = stringField(details, "to");
    if (flight && from && to) return `${flight} · ${from} → ${to}`;
  }

  if (type === "HOTEL") {
    const name = stringField(details, "name");
    if (name) return name;
  }

  if (type === "TRANSFER") {
    const from = stringField(details, "from");
    const to = stringField(details, "to");
    if (from && to) return `${from} → ${to}`;
  }

  return "Logística";
}

function logisticsSubline(
  type: LogisticsType,
  details: Record<string, unknown>,
): string | null {
  if (type === "FLIGHT") {
    const airline = stringField(details, "airline");
    const note = stringField(details, "note");
    return [airline, note].filter(Boolean).join(" · ") || null;
  }

  if (type === "HOTEL") {
    return stringField(details, "address");
  }

  if (type === "TRANSFER") {
    return stringField(details, "vehicle");
  }

  return null;
}

function stringField(
  details: Record<string, unknown>,
  key: string,
): string | null {
  const value = details[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}
