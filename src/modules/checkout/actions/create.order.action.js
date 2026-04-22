import { prisma } from "../../../config/prisma.js";
import { checkoutSchema } from "../validations/checkout.validation.js";
import { generateOrderReference } from "../services/checkout.service.js";
const createOrder = async (payload, trx = prisma, user_id = null) => {
  return await trx.order.create({
    data: {
      reference: generateOrderReference(),
      buyer_name: payload.name,
      buyer_email: payload.email,
      buyer_phone: payload.phone,
      event_id: payload.event_id,
      user_id: user_id,
    },
  });
};

export default createOrder;
