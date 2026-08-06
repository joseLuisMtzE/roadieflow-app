import { notFound, redirect } from "next/navigation";

import { EventForm } from "@/components/admin/event-form";
import { PageHeader } from "@/components/page-header";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/client";
import { toDatetimeLocalValue } from "@/lib/schemas/event";

export const dynamic = "force-dynamic";

type EditEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: EditEventPageProps) {
  const session = await auth();

  if (session?.user?.role !== Role.ADMIN) {
    redirect("/events");
  }

  const { id } = await params;

  const [event, artists] = await Promise.all([
    getDb().event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        date: true,
        locationName: true,
        city: true,
        artistId: true,
      },
    }),
    getDb().artist.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title="Editar evento"
        description={`Actualiza los datos de ${event.title}.`}
      />
      <div className="px-[var(--spacing-margin-mobile)]">
        <EventForm
          mode="edit"
          eventId={event.id}
          artists={artists}
          defaultValues={{
            title: event.title,
            date: toDatetimeLocalValue(event.date),
            locationName: event.locationName,
            city: event.city,
            artistId: event.artistId,
          }}
        />
      </div>
    </main>
  );
}
