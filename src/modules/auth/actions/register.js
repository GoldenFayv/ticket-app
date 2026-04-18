import { prisma } from "../../../config/prisma.js";
import { registerSchema } from "../authValidation.js";
import { generateToken } from "../services/authService.js";
import bcrypt from "bcryptjs";

const registerUserAction = async (data) => {
  try {
    const validated = registerSchema.parse(data);

    const { email, password, name } = validated;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      const error = new Error("An account with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    });

    const token = generateToken(newUser.id);

    return { ...newUser, token };
  } catch (error) {
    throw error;
  }
};

export default registerUserAction;
