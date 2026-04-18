import { prisma } from "../../../config/prisma.js";
import { compareOtp } from "../../../helpers/otpHandler.js";

async function verifyOtp(userId, payload) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const { otp } = payload;
  if (!otp) {
    const error = new Error("Otp field is required!");
    error.statusCode = 400;
    throw error;
  }

  await compareOtp(user.email, otp);

  return await prisma.user.update({
    where: { id: userId },
    data: { email_verified_at: new Date() },
  });
}

export default verifyOtp;
