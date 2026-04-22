import axios from "axios";
import { prisma } from "../../../config/prisma.js";

const verifyTransaction = async (reference) => {
  const baseUrl = process.env.FPS_BASE_URL;
  const url = `${baseUrl}/transaction/verify/${reference}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.FPS_SECRET}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.data.status && response.data.status !== "success") {
    const error = new Error(
      response.data.message ?? "Failed to generate payment link",
    );
    error.statusCode = 400;
    throw error;
  }

  const data = response.data.data;

  switch (data["status"]) {
    case "success":
      return await prisma.$transaction(async (trx) => {
        await trx.transaction.update({
          where: { reference },
          data: {
            paidAt: new Date(),
            status: "SUCCESS",
            provider_ref: data.reference,
          },
        });

        await trx.order.updateMany({
          where: { transaction: { reference } },
          data: { payment_status: "SUCCESS", paidAt: new Date() },
        });

        return true;
      });

    case "pending":
      return false;

    case "failed":
      await prisma.$transaction(async (trx) => {
        await trx.transaction.update({
          where: { reference },
          data: {
            status: "FAILED",
          },
        });
      });

      await trx.order.updateMany({
        where: { transaction: { reference } },
        data: { payment_status: "FAILED" },
      });
      const error = new Error("Payment Failed");
      const statusCode = 200;
      throw error;
  }
};

export default verifyTransaction;
