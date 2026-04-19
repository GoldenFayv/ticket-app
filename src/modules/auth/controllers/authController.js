import UserDto from "../../../dto/user.dto.js";
import { asyncHandler } from "../../../helpers/asyncHandler.js";
import { successResponse } from "../../../helpers/responseHandler.js";
import login from "../actions/login.js";

const store = asyncHandler(async (request, response) => {
  const user = await login(request.body);

  return successResponse(response, "Login successful", new UserDto(user));
});

export { store };
