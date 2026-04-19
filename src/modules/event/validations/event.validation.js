import z from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  city: z.string().min(2),
  date: z.coerce.date(), // ISO string
  // price: z.number().nonnegative(),
  lga_id: z.number().nonnegative(),
//   totalTickets: z.number().int().positive(),
});

export const createTicketSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});
