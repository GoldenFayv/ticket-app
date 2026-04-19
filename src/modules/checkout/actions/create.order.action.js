import { checkoutSchema } from "../validations/checkout.validation";

const createOrder = async (payload) => {
  validated = checkoutSchema.parse(payload);

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
      isPublished: true,
    },
    include: {
      ticketTypes: true,
    },
  });

  if (!event) {
    const error = new Error("Resource not found");
    error.statusCode = 404;
    throw error;
  }
};

export default createOrder;
