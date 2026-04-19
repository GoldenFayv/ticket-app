import { prisma } from "../../../config/prisma.js";
import { createEventSchema } from "../validations/event.validation.js";
import createTicket from "./create.ticket.action.js";

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

    if (payload.tickets?.length) {
      await Promise.all(
        payload.tickets.map((ticket) => createTicket(event.id, ticket, trx)),
      );
    }
    // const tickets = payload.tickets ?? [];
    // for (const ticket of tickets) {
    //   await createTicket(event.id, ticket, trx);
    // }
    return event;
  });
};

export default createEvent;
