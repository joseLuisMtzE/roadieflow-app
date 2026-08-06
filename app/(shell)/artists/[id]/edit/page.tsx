import { notFound, redirect } from "next/navigation";

import { ArtistForm } from "@/components/admin/artist-form";
import { PageHeader } from "@/components/page-header";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Role } from "@/lib/generated/prisma/client";

export const dynamic = "force-dynamic";

type EditArtistPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArtistPage({ params }: EditArtistPageProps) {
  const session = await auth();

  if (session?.user?.role !== Role.ADMIN) {
    redirect("/artists");
  }

  const { id } = await params;

  const artist = await getDb().artist.findUnique({
    where: { id },
    select: { id: true, name: true, genre: true },
  });

  if (!artist) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 pb-8">
      <PageHeader
        title="Editar artista"
        description={`Actualiza los datos de ${artist.name}.`}
      />
      <div className="px-[var(--spacing-margin-mobile)]">
        <ArtistForm
          mode="edit"
          artistId={artist.id}
          defaultValues={{ name: artist.name, genre: artist.genre }}
        />
      </div>
    </main>
  );
}
