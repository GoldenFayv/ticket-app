import { z } from "zod";

export const checkoutSchema = z.object({
  event_id: z.number().int().positive(),
  name: z.string().min(2, "Buyer name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().optional(),
  ticket_types: z.array(
    z.object({
      ticket_type_id: z.number().int().positive(),
      quantity: z.number().int().positive(),
    })
  ).min(1, "At least one ticket type must be selected"),
});