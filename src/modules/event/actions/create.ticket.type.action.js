import { prisma } from "../../../config/prisma.js";
import { createTicketTypeSchema } from "../validations/event.validation.js";

const createTicketType = async (eventId, payload, prismaTrx = prisma) => {
  const validated = createTicketTypeSchema.parse(payload);
  validated["purchased_quantity"] = 0;
  validated["event_id"] = eventId;
  return await prismaTrx.ticketType.create({
    data: validated,
  });
};

export default createTicketType;
