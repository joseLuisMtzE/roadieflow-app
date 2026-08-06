"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { assertCan, toActionError, type ActionResult } from "@/lib/rbac";
import {
  createLogisticsSchema,
  updateLogisticsSchema,
} from "@/lib/schemas/logistics";

function revalidateLogisticsPaths(eventId: string) {
  revalidatePath("/itinerary");
  revalidatePath("/events");
  revalidatePath(`/events/${eventId}`);
}

export async function createLogistics(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  try {
    const session = await auth();
    assertCan(session, "create", "logistics");

    const parsed = createLogisticsSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Datos inválidos",
      };
    }

    const event = await getDb().event.findUnique({
      where: { id: parsed.data.eventId },
      select: { id: true },
    });

    if (!event) {
      return { ok: false, error: "Evento no encontrado" };
    }

    const logistics = await getDb().logistics.create({
      data: {
        type: parsed.data.type,
        status: parsed.data.status,
        startTime: parsed.data.startTime,
        eventId: parsed.data.eventId,
        details: parsed.data.details,
      },
    });

    revalidateLogisticsPaths(parsed.data.eventId);

    return { ok: true, data: { id: logistics.id } };
  } catch (error) {
    return toActionError(error);
  }
}

export async function updateLogistics(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  try {
    const session = await auth();
    assertCan(session, "update", "logistics");

    const parsed = updateLogisticsSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Datos inválidos",
      };
    }

    const existing = await getDb().logistics.findUnique({
      where: { id: parsed.data.id },
      select: { id: true, eventId: true },
    });

    if (!existing) {
      return { ok: false, error: "Logística no encontrada" };
    }

    if (existing.eventId !== parsed.data.eventId) {
      return { ok: false, error: "No puedes cambiar el evento asociado" };
    }

    const logistics = await getDb().logistics.update({
      where: { id: parsed.data.id },
      data: {
        type: parsed.data.type,
        status: parsed.data.status,
        startTime: parsed.data.startTime,
        details: parsed.data.details,
      },
    });

    revalidateLogisticsPaths(existing.eventId);

    return { ok: true, data: { id: logistics.id } };
  } catch (error) {
    return toActionError(error);
  }
}
