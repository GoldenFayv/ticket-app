import { response } from "express";
import { asyncHandler } from "../../../helpers/asyncHandler.js";
import { successResponse } from "../../../helpers/responseHandler.js";
import requestOtp from "../actions/request.otp.action.js";
import verifyOtp from "../actions/verify.otp.action.js"

export const store = asyncHandler(async (request, response) => {
  const user = request.user;

  await requestOtp(user.id);

  return successResponse(response, "Otp sent");
});

export const destroy = asyncHandler(async (request, response) => {
  const user = request.user;

  await verifyOtp(user.id, request.body);

  return successResponse(response, "Email verified successfully!");
});
