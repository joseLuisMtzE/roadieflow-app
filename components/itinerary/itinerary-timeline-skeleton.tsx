export function ItineraryTimelineSkeleton() {
  return (
    <div
      className="flex flex-col gap-10 px-[var(--spacing-margin-mobile)] pb-4 pt-6"
      aria-busy
      aria-label="Cargando itinerario"
    >
      {[0, 1].map((section) => (
        <div key={section} className="flex flex-col gap-4">
          <div className="h-4 w-40 animate-pulse rounded-full bg-card editorial-offset" />
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className="h-28 animate-pulse rounded-3xl bg-muted/80"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
