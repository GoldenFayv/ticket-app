import { loginSchema } from "../authValidation.js";
import { generateToken } from "../services/authService.js";
import { prisma } from "../../../config/prisma.js";
import bcrypt from "bcryptjs";

const login = async (data) => {
  try {
    const validated = loginSchema.parse(data);
    const { email, password } = validated;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      const error = new Error("Resource not found");
      error.statusCode = 404;
      throw error;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      const error = new Error("Invalid credentials!");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user.id);

    return { ...user, token };
  } catch (error) {
    throw error;
  }
};

export default login;
