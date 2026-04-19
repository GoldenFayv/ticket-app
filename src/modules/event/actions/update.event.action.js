import { prisma } from "../../../config/prisma.js";
import { updateEventSchema } from "../validations/event.validation.js";
import createTicketType from "./create.ticket.type.action.js";
import updateTicketType from "./update.ticket.type.action.js";

const updateEvent = async (userId, eventId, payload) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId, user_id: userId },
  });

  if (!event) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  const validated = updateEventSchema.parse(payload);

  return await prisma.$transaction(async (trx) => {
    await trx.event.update({
      where: { id: eventId },
      data: {
        ...validated,
        ...(validated.date && { date: new Date(validated.date) }),
      },
    });

    for (const ticket of payload.tickets ?? []) {
      if (ticket.id) {
        await updateTicketType(eventId, Number(ticket.id), ticket, trx);
      } else {
        await createTicketType(eventId, ticket, trx);
      }
    }

    return await trx.event.findUnique({
      where: { id: eventId },
      include: {
        user: true,
        ticket_types: true,
      },
    });
  });
};

export default updateEvent;
