import { prisma } from "../../../config/prisma.js";
import { updateEventSchema } from "../validations/event.validation.js";
import createTicket from "./create.ticket.action.js";
import updateTicket from "./update.ticket.action.js";

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
        await updateTicket(eventId, Number(ticket.id), ticket, trx);
      } else {
        await createTicket(eventId, ticket, trx);
      }
    }

    return await trx.event.findUnique({
      where: { id: eventId },
      include: {
        user: true,
        tickets: true,
      },
    });
  });
};

export default updateEvent;
