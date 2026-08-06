import { z } from "zod";

export const hotelDetailsSchema = z.object({
  name: z.string().trim().min(1, "El nombre del hotel es obligatorio"),
  address: z.string().trim().min(1, "La dirección es obligatoria"),
  checkIn: z.string().trim().min(1, "El check-in es obligatorio"),
  checkOut: z.string().trim().min(1, "El check-out es obligatorio"),
});

export type HotelDetails = z.infer<typeof hotelDetailsSchema>;
