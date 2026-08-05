import { Suspense } from "react";

import { LoginForm } from "@/app/login/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-10 editorial-offset">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          RoadieFlow
        </p>
        <h1 className="text-headline-mobile mt-2 text-foreground">Entrar</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Accede con tu cuenta para ver el itinerario de la gira.
        </p>
      </div>

      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
