import { asyncHandler } from "../../../helpers/asyncHandler.js";
import { successResponse } from "../../../helpers/responseHandler.js";
import checkoutOrder from "../actions/create.checkout.action.js";
import OrderDto from "../../../dto/order.dto.js";

export const store = asyncHandler(async (request, response) => {
  const order = await checkoutOrder(request.body, request.user?.id);

  return successResponse(
    response,
    "Order created successfully",
    new OrderDto(order),
    201,
  );
});
