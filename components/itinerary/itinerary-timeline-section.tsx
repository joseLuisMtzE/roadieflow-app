import { ItineraryTimeline } from "@/components/itinerary/itinerary-timeline";
import { fetchItineraryTimeline } from "@/lib/itinerary/timeline";

export async function ItineraryTimelineSection() {
  const days = await fetchItineraryTimeline();
  return <ItineraryTimeline days={days} />;
}
