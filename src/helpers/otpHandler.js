import cache from "../config/cache.js";

const OTP_TTL = 60 * 10; // 10 minutes

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

export const createOtp = (email) => {
  const otp = generateOtp();
  const key = `otp:${email}`;

  cache.set(key, otp, OTP_TTL);
  return { otp: otp, expiresIn: OTP_TTL };
};

export const compareOtp = (email, otp) => {
  const key = `otp:${email}`;

  const cached = cache.get(key);

  if (!cached) {
    const error = new Error("OTP has expired or does not exist");
    error.statusCode = 400;
    throw error;
  }

  if (cached !== otp) {
    const error = new Error("Invalid OTP");
    error.statusCode = 400;
    throw error;
  }

  cache.del(`otp:${email}`); // invalidate after successful verification
  return true;
};
