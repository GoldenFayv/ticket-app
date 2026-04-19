import { prisma } from "../../../config/prisma.js";
import { createTicketSchema } from "../validations/event.validation.js";

const createTicket = async (eventId, payload, prismaTrx = prisma) => {
  const validated = createTicketSchema.parse(payload);

  return await prisma.ticket.create({
    data: {
      ...validated,
      purchased_quantity: 0,
      event_id: eventId,
    },
  });
};

export default createTicket;