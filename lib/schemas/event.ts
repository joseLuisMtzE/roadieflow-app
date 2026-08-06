import { z } from "zod";

function parseEventDate(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export const eventFieldsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "El título es obligatorio")
    .max(200, "El título no puede superar 200 caracteres"),
  date: z
    .string()
    .min(1, "La fecha es obligatoria")
    .refine((value) => parseEventDate(value) !== null, {
      message: "Fecha no válida",
    }),
  locationName: z
    .string()
    .trim()
    .min(1, "El venue es obligatorio")
    .max(200, "El venue no puede superar 200 caracteres"),
  city: z
    .string()
    .trim()
    .min(1, "La ciudad es obligatoria")
    .max(100, "La ciudad no puede superar 100 caracteres"),
  artistId: z.string().min(1, "Selecciona un artista"),
});

export const createEventSchema = eventFieldsSchema.transform((data) => ({
  ...data,
  date: parseEventDate(data.date)!,
}));

export const updateEventSchema = eventFieldsSchema
  .extend({
    id: z.string().min(1, "Evento no válido"),
  })
  .transform((data) => ({
    ...data,
    date: parseEventDate(data.date)!,
  }));

export type EventFormValues = z.infer<typeof eventFieldsSchema>;

export function toDatetimeLocalValue(date: Date): string {
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}
