import { createEventSchema } from "../validations/event.validation.js";
import { prisma } from "../../../config/prisma.js";
import { includes } from "zod";

const createEvent = async (userId, payload) => {
  try {
    const validated = createEventSchema.parse(payload);
    return await prisma.event.create({
      data: {
        ...validated,
        date: new Date(validated.date),
        user_id: userId,
      },
      include: {
        user: true
      } 
    });
  } catch (error) {
    throw error;
  }
};

export default createEvent;
