import { prisma } from "../../../config/prisma.js";
import { sendMail } from "../../../helpers/emailService.js";
import { createOtp } from "../../../helpers/otpHandler.js";

async function requestOtp(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const otp = createOtp(user.email);

  await sendMail(user.email, "E-mail Verification", "email_verification", {
    name: user.name,
    otp: otp.otp,
    expiresIn: `${otp.expiresIn} minutes`,
  });
}

export default requestOtp;
