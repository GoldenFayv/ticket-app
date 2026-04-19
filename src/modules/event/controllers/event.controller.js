import { asyncHandler } from "../../../helpers/asyncHandler.js";
import createEvent from "../actions/create.event.action.js";
import updateEvent from "../actions/update.event.action.js";
import {
  failureResponse,
  successResponse,
} from "../../../helpers/responseHandler.js";
import EventDto from "../../../dto/event.dto.js";
import { prisma } from "../../../config/prisma.js";
import { includes } from "zod";

export const store = asyncHandler(async (request, response) => {
  const event = await createEvent(request.user.id, request.body);

  return successResponse(
    response,
    "Event created successfully",
    new EventDto(event),
  );
});

export const index = asyncHandler(async (request, response) => {
  const events = await prisma.event.findMany({
    include: {
      user: true,
      ticket_types: true,
    },
  });

  return successResponse(
    response,
    "Events retrieved successfully",
    events.map((event) => new EventDto(event)),
  );
});

export const show = asyncHandler(async (request, response) => {
  const event = await prisma.event.findFirst({
    where: { id: Number(request.params.id) },
    include: { user: true, ticket_types: true },
  });

  if (!event) {
    return failureResponse(response, "Resource not found", null, 404);
  }

  return successResponse(
    response,
    `${event.title}' event retrieved!`,
    new EventDto(event),
  );
});

export const update = asyncHandler(async (request, response) => {
  const event = await updateEvent(
    Number(request.user.id),
    Number(request.params.eventId),
    request.body,
  );

  return successResponse(response, "Event updated!", new EventDto(event));
});
