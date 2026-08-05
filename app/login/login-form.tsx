"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.email("Introduce un email válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/itinerary";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(null);
    setAuthError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: parsed.data.email.trim().toLowerCase(),
        password: parsed.data.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError("Email o contraseña incorrectos");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
          aria-invalid={fieldError ? true : undefined}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Contraseña
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading}
          aria-invalid={fieldError || authError ? true : undefined}
          className="min-h-11"
        />
      </div>

      {(fieldError || authError) && (
        <p
          role="alert"
          className="rounded-2xl bg-[color-mix(in_srgb,var(--error-container)_35%,transparent)] px-4 py-3 text-sm text-[var(--on-error-container)]"
        >
          {fieldError ?? authError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
