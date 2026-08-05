import { LogoutButton } from "@/components/auth/logout-button";
import { PageHeader } from "@/components/page-header";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <main className="flex flex-1 flex-col gap-8 pb-8">
      <PageHeader
        title="Perfil"
        description={
          session?.user?.email
            ? `Sesión activa como ${session.user.email}`
            : "Tu cuenta y preferencias."
        }
      />
      {session?.user ? <LogoutButton /> : null}
    </main>
  );
}
