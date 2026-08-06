import { z } from "zod";

const optionalGenre = z
  .string()
  .trim()
  .max(80, "El género no puede superar 80 caracteres")
  .transform((value) => (value.length > 0 ? value : undefined))
  .optional();

export const artistFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(120, "El nombre no puede superar 120 caracteres"),
  genre: optionalGenre,
});

export const createArtistSchema = artistFieldsSchema;

export const updateArtistSchema = artistFieldsSchema.extend({
  id: z.string().min(1, "Artista no válido"),
});

export type ArtistFormValues = z.infer<typeof artistFieldsSchema>;
