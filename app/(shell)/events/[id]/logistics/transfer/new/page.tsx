import { notFound, redirect } from "next/navigation";

import { TransferLogisticsForm } from "@/components/admin/logistics/transfer-logistics-form";
import { PageHeader } from "@/components/page-header";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

type NewTransferLogisticsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewTransferLogisticsPage({
  params,
}: NewTransferLogisticsPageProps) {
  const session = await auth();

  if (session?.user?.role !== Role.ADMIN) {
    redirect("/events");
  }

  const { id } = await params;

  const event = await getDb().event.findUnique({
    where: { id },
    select: { id: true, title: true },
  });

  if (!event) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title="Nuevo traslado"
        description={`Logística para ${event.title}.`}
      />
      <div className="px-[var(--spacing-margin-mobile)]">
        <TransferLogisticsForm eventId={event.id} />
      </div>
    </main>
  );
}
