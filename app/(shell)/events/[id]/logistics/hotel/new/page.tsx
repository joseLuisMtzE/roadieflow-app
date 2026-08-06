import { notFound, redirect } from "next/navigation";

import { HotelLogisticsForm } from "@/components/admin/logistics/hotel-logistics-form";
import { PageHeader } from "@/components/page-header";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

type NewHotelLogisticsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewHotelLogisticsPage({
  params,
}: NewHotelLogisticsPageProps) {
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
        title="Nuevo hotel"
        description={`Logística para ${event.title}.`}
      />
      <div className="px-[var(--spacing-margin-mobile)]">
        <HotelLogisticsForm eventId={event.id} />
      </div>
    </main>
  );
}
