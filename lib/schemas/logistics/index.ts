import { z } from "zod";

import { LogisticsType, Status } from "@/lib/generated/prisma/client";

import { flightDetailsSchema } from "./flight";
import { hotelDetailsSchema } from "./hotel";
import { transferDetailsSchema } from "./transfer";

export { flightDetailsSchema } from "./flight";
export { hotelDetailsSchema } from "./hotel";
export { transferDetailsSchema } from "./transfer";

function parseStartTime(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

const startTimeField = z
  .string()
  .min(1, "La hora de inicio es obligatoria")
  .refine((value) => parseStartTime(value) !== null, {
    message: "Hora no válida",
  });

const logisticsBaseSchema = z.object({
  status: z.nativeEnum(Status, {
    message: "Estado no válido",
  }),
  startTime: startTimeField,
  eventId: z.string().min(1, "Evento no válido"),
});

const flightLogisticsSchema = logisticsBaseSchema.extend({
  type: z.literal(LogisticsType.FLIGHT),
  details: flightDetailsSchema,
});

const hotelLogisticsSchema = logisticsBaseSchema.extend({
  type: z.literal(LogisticsType.HOTEL),
  details: hotelDetailsSchema,
});

const transferLogisticsSchema = logisticsBaseSchema.extend({
  type: z.literal(LogisticsType.TRANSFER),
  details: transferDetailsSchema,
});

export const createLogisticsSchema = z
  .discriminatedUnion("type", [
    flightLogisticsSchema,
    hotelLogisticsSchema,
    transferLogisticsSchema,
  ])
  .transform((data) => ({
    ...data,
    startTime: parseStartTime(data.startTime)!,
  }));

export const updateLogisticsSchema = z
  .discriminatedUnion("type", [
    flightLogisticsSchema.extend({
      id: z.string().min(1, "Logística no válida"),
    }),
    hotelLogisticsSchema.extend({
      id: z.string().min(1, "Logística no válida"),
    }),
    transferLogisticsSchema.extend({
      id: z.string().min(1, "Logística no válida"),
    }),
  ])
  .transform((data) => ({
    ...data,
    startTime: parseStartTime(data.startTime)!,
  }));

export type CreateLogisticsInput = z.input<typeof createLogisticsSchema>;
export type UpdateLogisticsInput = z.input<typeof updateLogisticsSchema>;

export function logisticsDetailsSchemaForType(type: LogisticsType) {
  switch (type) {
    case LogisticsType.FLIGHT:
      return flightDetailsSchema;
    case LogisticsType.HOTEL:
      return hotelDetailsSchema;
    case LogisticsType.TRANSFER:
      return transferDetailsSchema;
    default: {
      const exhaustive: never = type;
      return exhaustive;
    }
  }
}

export function toDatetimeLocalValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}
