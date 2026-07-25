import { TimelineCard } from "@/components/itinerary/timeline-card";
import type { TimelineDayGroup } from "@/lib/itinerary/timeline";

type ItineraryTimelineProps = {
  days: TimelineDayGroup[];
};

export function ItineraryTimeline({ days }: ItineraryTimelineProps) {
  if (days.length === 0) {
    return (
      <div className="px-[var(--spacing-margin-mobile)] py-10">
        <p className="text-body-md text-muted-foreground editorial-offset">
          No hay ítems en el itinerario. Ejecuta{" "}
          <span className="font-mono text-label-md">yarn db:seed</span> con
          Postgres en marcha.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-[var(--spacing-margin-mobile)] pb-4 pt-6">
      {days.map((day) => (
        <section key={day.dayKey} aria-labelledby={`day-${day.dayKey}`}>
          <h2
            id={`day-${day.dayKey}`}
            className="mb-4 font-mono text-label-md uppercase tracking-wide text-muted-foreground editorial-offset"
          >
            {day.label}
          </h2>
          <ol className="relative flex flex-col gap-4">
            {day.items.map((item) => (
              <li key={`${item.kind}-${item.id}`} className="relative pl-6">
                <span
                  aria-hidden
                  className="absolute left-0 top-6 size-2 -translate-x-1/2 rounded-full bg-primary"
                />
                <TimelineCard item={item} />
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
