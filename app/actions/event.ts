"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { assertCan, toActionError, type ActionResult } from "@/lib/rbac";
import { createEventSchema, updateEventSchema } from "@/lib/schemas/event";

function revalidateEventPaths(eventId?: string) {
  revalidatePath("/events");
  revalidatePath("/itinerary");

  if (eventId) {
    revalidatePath(`/events/${eventId}`);
    revalidatePath(`/events/${eventId}/edit`);
  }
}

export async function createEvent(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  try {
    const session = await auth();
    assertCan(session, "create", "event");

    const parsed = createEventSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Datos inválidos",
      };
    }

    const artist = await getDb().artist.findUnique({
      where: { id: parsed.data.artistId },
      select: { id: true },
    });

    if (!artist) {
      return { ok: false, error: "Artista no encontrado" };
    }

    const event = await getDb().event.create({
      data: {
        title: parsed.data.title,
        date: parsed.data.date,
        locationName: parsed.data.locationName,
        city: parsed.data.city,
        artistId: parsed.data.artistId,
      },
    });

    revalidateEventPaths(event.id);

    return { ok: true, data: { id: event.id } };
  } catch (error) {
    return toActionError(error);
  }
}

export async function updateEvent(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  try {
    const session = await auth();
    assertCan(session, "update", "event");

    const parsed = updateEventSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Datos inválidos",
      };
    }

    const existing = await getDb().event.findUnique({
      where: { id: parsed.data.id },
      select: { id: true },
    });

    if (!existing) {
      return { ok: false, error: "Evento no encontrado" };
    }

    const artist = await getDb().artist.findUnique({
      where: { id: parsed.data.artistId },
      select: { id: true },
    });

    if (!artist) {
      return { ok: false, error: "Artista no encontrado" };
    }

    const event = await getDb().event.update({
      where: { id: parsed.data.id },
      data: {
        title: parsed.data.title,
        date: parsed.data.date,
        locationName: parsed.data.locationName,
        city: parsed.data.city,
        artistId: parsed.data.artistId,
      },
    });

    revalidateEventPaths(event.id);

    return { ok: true, data: { id: event.id } };
  } catch (error) {
    return toActionError(error);
  }
}
