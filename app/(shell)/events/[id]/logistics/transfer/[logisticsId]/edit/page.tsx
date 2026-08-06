import { notFound, redirect } from "next/navigation";

import { TransferLogisticsForm } from "@/components/admin/logistics/transfer-logistics-form";
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

type EditTransferLogisticsPageProps = {
  params: Promise<{ id: string; logisticsId: string }>;
};

export default async function EditTransferLogisticsPage({
  params,
}: EditTransferLogisticsPageProps) {
  const session = await auth();

  if (session?.user?.role !== Role.ADMIN) {
    redirect("/events");
  }

  const { id: eventId, logisticsId } = await params;
  const logistics = await loadLogisticsForEdit(
    eventId,
    logisticsId,
    LogisticsType.TRANSFER,
  );

  if (!logistics) {
    notFound();
  }

  const details = detailsRecord(logistics.details);

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title="Editar traslado"
        description={`Logística para ${logistics.event.title}.`}
      />
      <div className="px-[var(--spacing-margin-mobile)]">
        <TransferLogisticsForm
          mode="edit"
          eventId={logistics.eventId}
          logisticsId={logistics.id}
          defaultValues={{
            status: logistics.status as StatusValue,
            startTime: toDatetimeLocalValue(logistics.startTime),
            from: detailString(details, "from"),
            to: detailString(details, "to"),
            vehicle: detailString(details, "vehicle"),
          }}
        />
      </div>
    </main>
  );
}
