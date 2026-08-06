import { notFound, redirect } from "next/navigation";

import { FlightLogisticsForm } from "@/components/admin/logistics/flight-logistics-form";
import { PageHeader } from "@/components/page-header";
import { auth } from "@/lib/auth";
import type { StatusValue } from "@/lib/logistics/constants";
import {
  detailString,
  detailsRecord,
  loadLogisticsForEdit,
} from "@/lib/logistics/load-for-edit";
import { LogisticsType, Role } from "@/lib/generated/prisma/client";
import { toDatetimeLocalValue } from "@/lib/schemas/logistics";

export const dynamic = "force-dynamic";

type EditFlightLogisticsPageProps = {
  params: Promise<{ id: string; logisticsId: string }>;
};

export default async function EditFlightLogisticsPage({
  params,
}: EditFlightLogisticsPageProps) {
  const session = await auth();

  if (session?.user?.role !== Role.ADMIN) {
    redirect("/events");
  }

  const { id: eventId, logisticsId } = await params;
  const logistics = await loadLogisticsForEdit(
    eventId,
    logisticsId,
    LogisticsType.FLIGHT,
  );

  if (!logistics) {
    notFound();
  }

  const details = detailsRecord(logistics.details);

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title="Editar vuelo"
        description={`Logística para ${logistics.event.title}.`}
      />
      <div className="px-[var(--spacing-margin-mobile)]">
        <FlightLogisticsForm
          mode="edit"
          eventId={logistics.eventId}
          logisticsId={logistics.id}
          defaultValues={{
            status: logistics.status as StatusValue,
            startTime: toDatetimeLocalValue(logistics.startTime),
            airline: detailString(details, "airline"),
            flightNumber: detailString(details, "flightNumber"),
            from: detailString(details, "from"),
            to: detailString(details, "to"),
            note: detailString(details, "note"),
          }}
        />
      </div>
    </main>
  );
}
