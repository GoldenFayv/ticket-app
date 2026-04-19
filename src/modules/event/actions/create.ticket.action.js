import { prisma } from "../../../config/prisma.js";
import { createTicketSchema } from "../validations/event.validation.js";

const createTicket = async (eventId, payload, prismaTrx = prisma) => {
  const validated = createTicketSchema.parse(payload);
  validated["purchased_quantity"] = 0;
  validated["event_id"] = eventId;
  return await prismaTrx.ticket.create({
    data: validated,
  });
};

export default createTicket;
