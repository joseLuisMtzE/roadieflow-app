"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createEvent, updateEvent } from "@/app/actions/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { eventFieldsSchema } from "@/lib/schemas/event";

type ArtistOption = {
  id: string;
  name: string;
};

type EventFormProps = {
  mode: "create" | "edit";
  eventId?: string;
  artists: ArtistOption[];
  defaultValues?: {
    title: string;
    date: string;
    locationName: string;
    city: string;
    artistId: string;
  };
};

const selectClassName =
  "glass-surface min-h-11 w-full rounded-full px-4 text-sm text-foreground shadow-[inset_0_0_0_1px_var(--ghost-border)] outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--ghost-border-focus)] disabled:opacity-50";

export function EventForm({
  mode,
  eventId,
  artists,
  defaultValues,
}: EventFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [date, setDate] = useState(defaultValues?.date ?? "");
  const [locationName, setLocationName] = useState(
    defaultValues?.locationName ?? "",
  );
  const [city, setCity] = useState(defaultValues?.city ?? "");
  const [artistId, setArtistId] = useState(defaultValues?.artistId ?? "");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(null);
    setSubmitError(null);

    const parsed = eventFieldsSchema.safeParse({
      title,
      date,
      locationName,
      city,
      artistId,
    });

    if (!parsed.success) {
      setFieldError(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }

    setLoading(true);
    try {
      const result =
        mode === "create"
          ? await createEvent(parsed.data)
          : await updateEvent({ ...parsed.data, id: eventId ?? "" });

      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }

      router.push("/events");
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
          htmlFor="event-title"
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Título
        </label>
        <Input
          id="event-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={loading}
          aria-invalid={errorMessage ? true : undefined}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="event-date"
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Fecha y hora
        </label>
        <Input
          id="event-date"
          type="datetime-local"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="event-location"
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Venue
        </label>
        <Input
          id="event-location"
          type="text"
          value={locationName}
          onChange={(event) => setLocationName(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="event-city"
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Ciudad
        </label>
        <Input
          id="event-city"
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          disabled={loading}
          className="min-h-11"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="event-artist"
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase"
        >
          Artista
        </label>
        <select
          id="event-artist"
          value={artistId}
          onChange={(event) => setArtistId(event.target.value)}
          disabled={loading || artists.length === 0}
          className={selectClassName}
        >
          <option value="">Selecciona un artista</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
        {artists.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Crea un artista antes de registrar un evento.
          </p>
        ) : null}
      </div>

      {errorMessage ? (
        <p
          role="alert"
          className="rounded-2xl bg-[color-mix(in_srgb,var(--error-container)_35%,transparent)] px-4 py-3 text-sm text-[var(--on-error-container)]"
        >
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={loading || artists.length === 0}
        className="w-full"
      >
        {loading
          ? "Guardando…"
          : mode === "create"
            ? "Crear evento"
            : "Guardar cambios"}
      </Button>
    </form>
  );
}
