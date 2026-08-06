import { z } from "zod";

export const flightDetailsSchema = z.object({
  airline: z.string().trim().min(1, "La aerolínea es obligatoria"),
  flightNumber: z.string().trim().min(1, "El número de vuelo es obligatorio"),
  from: z.string().trim().min(1, "El origen es obligatorio"),
  to: z.string().trim().min(1, "El destino es obligatorio"),
  note: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
});

export type FlightDetails = z.infer<typeof flightDetailsSchema>;
