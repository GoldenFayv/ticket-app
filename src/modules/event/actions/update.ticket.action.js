import { prisma } from "../../../config/prisma.js";
import { updateTicketSchema } from "../validations/event.validation.js";

const updateTicket = async (eventId, ticketId, payload, trx = prisma) => {
  const ticket = await trx.ticket.findUnique({
    where: { id: ticketId, event_id: eventId },
  });

  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = 404;
    throw error;
  }

  const validated = updateTicketSchema.parse(payload);

  return await trx.ticket.update({
      where: { id: ticketId },
      data: validated,
  });
};

export default updateTicket;
