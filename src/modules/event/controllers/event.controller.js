import { asyncHandler } from "../../../helpers/asyncHandler.js";
import createEvent from "../actions/create.event.action.js";
import { successResponse } from "../../../helpers/responseHandler.js";
import EventDto from "../../../dto/event.dto.js";

export const store = asyncHandler(async (request, response) => {
  const event = await createEvent(request.user.id, request.body);

  return successResponse(response, "Event created successfully", new EventDto(event));
});
