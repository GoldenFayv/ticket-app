import UserDto from "../../../dto/user.dto.js";
import { asyncHandler } from "../../../helpers/asyncHandler.js";
import { sendMail } from "../../../helpers/emailService.js";
import { createOtp } from "../../../helpers/otpHandler.js";
import { successResponse } from "../../../helpers/responseHandler.js";
import registerUserAction from "../actions/register.js";
import requestOtp from "../actions/request.otp.action.js";

const registerUser = asyncHandler(async (request, response, next) => {
  const user = await registerUserAction(request.body);

  await requestOtp(user.id);

  return successResponse(response, "Account created successfully", new UserDto(user), 201);
});

export default registerUser;
