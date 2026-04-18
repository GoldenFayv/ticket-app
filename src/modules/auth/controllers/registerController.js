import { asyncHandler } from "../../../helpers/asyncHandler.js";
import { sendMail } from "../../../helpers/emailService.js";
import { createOtp } from "../../../helpers/otpHandler.js";
import { successResponse } from "../../../helpers/responseHandler.js";
import registerUserAction from "../actions/register.js";

const registerUser = asyncHandler(async (request, response, next) => {
  const user = await registerUserAction(request.body);

  const otp = createOtp(user.email);

  sendMail(user.email, "E-mail Verification", "email_verification", {
    name: user.name,
    otp: otp.otp,
    expiresIn: `${otp.expiresIn} minutes`,
  });

  return successResponse(response, "Account created successfully", user, 201);
});

export default registerUser;
