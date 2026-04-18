import { prisma } from "../../../config/prisma.js";
import { failureResponse } from "../../../helpers/responseHandler.js";

async function emailVerified(request, response, next) {
  try {
    const user = await prisma.user.findUnique({ where: { id: request.user.id }, select: {email_verified_at:true} });
    if (!user.email_verified_at) {
      return failureResponse(
        response,
        "verify your email to continue!!",
        null,
        403,
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default emailVerified;
