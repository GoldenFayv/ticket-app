import { successResponse } from "../../../helpers/responseHandler.js";
import {prisma} from "../../../config/prisma.js"
import UserDto from "../../../dto/user.dto.js";

export async function getProfile(request, response) {
  const user = await prisma.user.findUnique({
    where: { id: request.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      email_verified_at: true
    },
  });

  return successResponse(response, "profile", new UserDto(user), 200);
}
