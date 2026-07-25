import type {
  Event,
  Logistics,
  LogisticsType,
  Status,
} from "@/lib/generated/prisma/client";

export type TimelineShowItem = {
  kind: "show";
  id: string;
  at: Date;
  title: string;
  locationName: string;
  city: string;
  artistName: string;
};

export type TimelineLogisticsItem = {
  kind: "logistics";
  id: string;
  at: Date;
  type: LogisticsType;
  status: Status;
  details: Record<string, unknown>;
  eventTitle: string;
  city: string;
};

export type TimelineItem = TimelineShowItem | TimelineLogisticsItem;

export type TimelineDayGroup = {
  dayKey: string;
  label: string;
  items: TimelineItem[];
};

const dayLabelFormatter = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "America/Mexico_City",
});

const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "America/Mexico_City",
});

export function toTimelineItems(
  events: (Event & { artist: { name: string } })[],
  logistics: (Logistics & {
    event: { title: string; city: string };
  })[],
): TimelineItem[] {
  const shows: TimelineShowItem[] = events.map((event) => ({
    kind: "show",
    id: event.id,
    at: event.date,
    title: event.title,
    locationName: event.locationName,
    city: event.city,
    artistName: event.artist.name,
  }));

  const legs: TimelineLogisticsItem[] = logistics.map((item) => ({
    kind: "logistics",
    id: item.id,
    at: item.startTime,
    type: item.type,
    status: item.status,
    details:
      item.details &&
      typeof item.details === "object" &&
      !Array.isArray(item.details)
        ? (item.details as Record<string, unknown>)
        : {},
    eventTitle: item.event.title,
    city: item.event.city,
  }));

  return [...shows, ...legs].sort((a, b) => a.at.getTime() - b.at.getTime());
}

export function groupTimelineByDay(items: TimelineItem[]): TimelineDayGroup[] {
  const groups = new Map<string, TimelineDayGroup>();

  for (const item of items) {
    const dayKey = dayKeyFormatter.format(item.at);
    const existing = groups.get(dayKey);
    if (existing) {
      existing.items.push(item);
      continue;
    }

    groups.set(dayKey, {
      dayKey,
      label: capitalize(dayLabelFormatter.format(item.at)),
      items: [item],
    });
  }

  return [...groups.values()];
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export async function fetchItineraryTimeline(): Promise<TimelineDayGroup[]> {
  const { getDb } = await import("@/lib/db");

  const [events, logistics] = await Promise.all([
    getDb().event.findMany({
      orderBy: { date: "asc" },
      include: { artist: true },
    }),
    getDb().logistics.findMany({
      orderBy: { startTime: "asc" },
      include: {
        event: {
          select: { title: true, city: true },
        },
      },
    }),
  ]);

  return groupTimelineByDay(toTimelineItems(events, logistics));
}
