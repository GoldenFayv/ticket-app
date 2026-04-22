import { prisma } from "../../../config/prisma.js";

const createTransaction = async (payload, prismaTrx = prisma) => {
  return await prismaTrx.transaction.create({
    data: payload,
  });
};

export default createTransaction;
