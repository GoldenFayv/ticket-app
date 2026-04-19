import { prisma } from "../../../config/prisma.js";
import { updateTicketTypeSchema } from "../validations/event.validation.js";

const updateTicketType = async (eventId, ticketTypeId, payload, trx = prisma) => {
  console.log({
    "event": eventId,
    "ticket": ticketTypeId
  })
  const ticketType = await trx.ticketType.findUnique({
    where: { id: ticketTypeId, event_id: eventId },
  });

  if (!ticketType) {
    const error = new Error("Ticket type not found");
    error.statusCode = 404;
    throw error;
  }

  const validated = updateTicketTypeSchema.parse(payload);

  return await trx.ticketType.update({
      where: { id: ticketTypeId },
      data: validated,
  });
};

export default updateTicketType;
