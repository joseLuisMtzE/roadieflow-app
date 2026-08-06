import { z } from "zod";

export const transferDetailsSchema = z.object({
  from: z.string().trim().min(1, "El origen es obligatorio"),
  to: z.string().trim().min(1, "El destino es obligatorio"),
  vehicle: z.string().trim().min(1, "El vehículo es obligatorio"),
});

export type TransferDetails = z.infer<typeof transferDetailsSchema>;
