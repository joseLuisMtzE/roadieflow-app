import { getDb } from "@/lib/db";
import type { LogisticsType } from "@/lib/generated/prisma/client";

export async function loadLogisticsForEdit(
  eventId: string,
  logisticsId: string,
  expectedType: LogisticsType,
) {
  const logistics = await getDb().logistics.findUnique({
    where: { id: logisticsId },
    include: {
      event: { select: { id: true, title: true } },
    },
  });

  if (
    !logistics ||
    logistics.eventId !== eventId ||
    logistics.type !== expectedType
  ) {
    return null;
  }

  return logistics;
}

export function detailsRecord(details: unknown): Record<string, unknown> {
  if (details && typeof details === "object" && !Array.isArray(details)) {
    return details as Record<string, unknown>;
  }

  return {};
}

export function detailString(
  details: Record<string, unknown>,
  key: string,
): string {
  const value = details[key];
  return typeof value === "string" ? value : "";
}
