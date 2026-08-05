import { redirect } from "next/navigation";

import { ItineraryTimeline } from "@/components/itinerary/itinerary-timeline";
import { auth } from "@/lib/auth";
import { fetchItineraryTimeline } from "@/lib/itinerary/timeline";

export async function ItineraryTimelineSection() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const days = await fetchItineraryTimeline();
  return <ItineraryTimeline days={days} />;
}
