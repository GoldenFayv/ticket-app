import { asyncHandler } from "../../../helpers/asyncHandler.js";
import {
  failureResponse,
  successResponse,
} from "../../../helpers/responseHandler.js";
import getPaymentLink from "../actions/get.payment.link.action.js";
import verifyTransaction from "../actions/verify.transaction.action.js";

export const store = asyncHandler(async (request, response) => {
  const link = await getPaymentLink(request.body, request?.user);
  return successResponse(response, "Payment link", link, null, 200);
});

export const show = asyncHandler(async (request, response) => {
  const status = await verifyTransaction(request.params.reference);
  status
    ? successResponse(response, "Transaction successfully verified!!")
    : failureResponse(response, "Payment Pending!");
  return status;
});
