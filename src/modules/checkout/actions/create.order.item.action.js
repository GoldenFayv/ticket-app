import { prisma } from "../../../config/prisma.js";

const appendOrderItem = async (payload, order_id, trx = prisma) => {
  const ticketType = await trx.ticketType.findUnique({
    where: { id: payload.ticket_type_id },
  });

  if (!ticketType) {
    const error = new Error(`Ticket type ${payload.ticket_type_id} not found`);
    error.statusCode = 404;
    throw error;
  }
// console.log(ticketType)
  return await trx.orderItem.create({
    data: {
      ...payload,
      unit_price: ticketType.price,
      total_price: ticketType.price * payload.quantity,
      order_id,
    },
  });
};

export default appendOrderItem;
