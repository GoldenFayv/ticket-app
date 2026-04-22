import { z } from "zod";
import { GATEWAYS } from "../enum/payment.enum.js";

export const paymentValidationSchema = z.object({
  gateway: z.enum(GATEWAYS),
  orderIds: z
    .array(z.number().int({ message: "please select the right order" }))
    .min(1, { message: "select at least one order" }),
});
