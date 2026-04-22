import { includes } from "zod";
import { prisma } from "../../../config/prisma.js";
import { checkoutSchema } from "../validations/checkout.validation.js";
import createOrder from "./create.order.action.js";
import appendOrderItem from "./create.order.item.action.js";

const checkoutOrder = async (payload, user_id = null) => {
  const validated = checkoutSchema.parse(payload);
  //todo: implement contract
  const event = await prisma.event.findUnique({
    where: {
      id: validated.event_id,
      // isPublished: true,
    },
    include: {
      ticket_types: true,
    },
  });

  if (!event) {
    const error = new Error("Resource not found");
    error.statusCode = 404;
    throw error;
  }

  return prisma.$transaction(async (trx) => {
    const order = await createOrder(payload, trx, user_id);

    await Promise.all(
      payload.ticket_types.map((ticket_type) =>
        appendOrderItem(ticket_type, order.id, trx),
      ),
    );

    return await trx.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        items: {
          include: {
            ticket_type: true,
          },
        },
        event: true,
      },
    });
  });
};

export default checkoutOrder;
