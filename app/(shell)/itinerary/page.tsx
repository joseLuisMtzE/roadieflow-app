import { Suspense } from "react";

import { ItineraryTimelineSection } from "@/components/itinerary/itinerary-timeline-section";
import { ItineraryTimelineSkeleton } from "@/components/itinerary/itinerary-timeline-skeleton";
import { PageHeader } from "@/components/page-header";

export const dynamic = "force-dynamic";

export default function ItineraryPage() {
  return (
    <main className="flex flex-1 flex-col pb-8">
      <PageHeader
        title="Itinerario"
        description="Timeline de shows y logística de la gira."
      />
      <Suspense fallback={<ItineraryTimelineSkeleton />}>
        <ItineraryTimelineSection />
      </Suspense>
    </main>
  );
}
