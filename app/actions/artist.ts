"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { assertCan, toActionError, type ActionResult } from "@/lib/rbac";
import { createArtistSchema, updateArtistSchema } from "@/lib/schemas/artist";

function revalidateArtistPaths() {
  revalidatePath("/artists");
  revalidatePath("/events");
  revalidatePath("/itinerary");
}

export async function createArtist(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  try {
    const session = await auth();
    assertCan(session, "create", "artist");

    const parsed = createArtistSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Datos inválidos",
      };
    }

    const artist = await getDb().artist.create({
      data: {
        name: parsed.data.name,
        genre: parsed.data.genre ?? null,
      },
    });

    revalidateArtistPaths();

    return { ok: true, data: { id: artist.id } };
  } catch (error) {
    return toActionError(error);
  }
}

export async function updateArtist(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  try {
    const session = await auth();
    assertCan(session, "update", "artist");

    const parsed = updateArtistSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Datos inválidos",
      };
    }

    const existing = await getDb().artist.findUnique({
      where: { id: parsed.data.id },
      select: { id: true },
    });

    if (!existing) {
      return { ok: false, error: "Artista no encontrado" };
    }

    const artist = await getDb().artist.update({
      where: { id: parsed.data.id },
      data: {
        name: parsed.data.name,
        genre: parsed.data.genre ?? null,
      },
    });

    revalidateArtistPaths();

    return { ok: true, data: { id: artist.id } };
  } catch (error) {
    return toActionError(error);
  }
}
