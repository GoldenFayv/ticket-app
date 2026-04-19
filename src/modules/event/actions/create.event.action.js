import { prisma } from "../../../config/prisma.js";
import { createEventSchema } from "../validations/event.validation.js";
import createTicketType from "./create.ticket.type.action.js";

const createEvent = async (userId, payload) => {
  const validated = createEventSchema.parse(payload);
  return await prisma.$transaction(async (trx) => {
    const event = await trx.event.create({
      data: {
        ...validated,
        date: new Date(validated.date),
        user_id: userId,
      },
    });

    if (payload.ticket_types?.length) {
      await Promise.all(
        payload.ticket_types.map((ticket_type) =>
          createTicketType(event.id, ticket_type, trx),
        ),
      );
    }

    return await trx.event.findUnique({
      where: { id: event.id },
      include: {
        user: true,
        ticket_types: true,
      },
    });
  });
};

export default createEvent;
