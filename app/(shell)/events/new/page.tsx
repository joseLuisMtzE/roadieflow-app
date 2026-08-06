import { redirect } from "next/navigation";

import { EventForm } from "@/components/admin/event-form";
import { PageHeader } from "@/components/page-header";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  const session = await auth();

  if (session?.user?.role !== Role.ADMIN) {
    redirect("/events");
  }

  const artists = await getDb().artist.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title="Nuevo evento"
        description="Registra una fecha de la gira."
      />
      <div className="px-[var(--spacing-margin-mobile)]">
        <EventForm mode="create" artists={artists} />
      </div>
    </main>
  );
}
