import { redirect } from "next/navigation";

import { ArtistForm } from "@/components/admin/artist-form";
import { PageHeader } from "@/components/page-header";
import { auth } from "@/lib/auth";
import { Role } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

export default async function NewArtistPage() {
  const session = await auth();

  if (session?.user?.role !== Role.ADMIN) {
    redirect("/artists");
  }

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title="Nuevo artista"
        description="Añade un artista a la gira."
      />
      <div className="px-[var(--spacing-margin-mobile)]">
        <ArtistForm mode="create" />
      </div>
    </main>
  );
}
