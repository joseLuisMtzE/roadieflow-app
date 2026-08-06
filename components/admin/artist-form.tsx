"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createArtist, updateArtist } from "@/app/actions/artist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { artistFieldsSchema } from "@/lib/schemas/artist";

type ArtistFormProps = {
  mode: "create" | "edit";
  artistId?: string;
  defaultValues?: {
    name: string;
    genre?: string | null;
  };
};

export function ArtistForm({ mode, artistId, defaultValues }: ArtistFormProps) {
  const router = useRouter();
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [genre, setGenre] = useState(defaultValues?.genre ?? "");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(null);
    setSubmitError(null);

    const parsed = artistFieldsSchema.safeParse({ name, genre });
    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }

    setLoading(true);
    try {
      const result =
        mode === "create"
          ? await createArtist(parsed.data)
          : await updateArtist({ ...parsed.data, id: artistId ?? "" });

      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }

      router.push("/artists");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const errorMessage = fieldError ?? submitError;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="artist-name"
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Nombre
        </label>
        <Input
          id="artist-name"
          type="text"
          autoComplete="organization"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading}
          aria-invalid={errorMessage ? true : undefined}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="artist-genre"
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Género <span className="text-muted-foreground/70">(opcional)</span>
        </label>
        <Input
          id="artist-genre"
          type="text"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      {errorMessage ? (
        <p
          role="alert"
          className="rounded-2xl bg-[color-mix(in_srgb,var(--error-container)_35%,transparent)] px-4 py-3 text-sm text-[var(--on-error-container)]"
        >
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={loading} className="w-full">
        {loading
          ? "Guardando…"
          : mode === "create"
            ? "Crear artista"
            : "Guardar cambios"}
      </Button>
    </form>
  );
}
