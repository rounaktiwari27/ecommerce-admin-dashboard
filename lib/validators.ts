import { z } from "zod";

export const productSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Product name is required"),
  price: z
    .number()
    .positive("Price must be greater than 0"),
});