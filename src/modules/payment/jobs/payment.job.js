import cron from "node-cron";
import { prisma } from "../../../config/prisma.js";
import verifyTransaction from "../actions/verify.transaction.action.js"

const TWENTY_MINUTES_AGO = () => new Date(Date.now() - 20 * 60 * 1000);

export const verifyPendingTransactionsJob = () => {
  cron.schedule("*/5 * * * *", async () => { // runs every 5 minutes
    console.log("[Job] Checking pending transactions...");

    const pendingTransactions = await prisma.transaction.findMany({
      where: {
        status: "PENDING",
        createdAt: { lte: TWENTY_MINUTES_AGO() },
      },
    });

    for (const transaction of pendingTransactions) {
      try {
        await verifyTransaction(transaction.reference);
        console.log(`[Job] Verified transaction: ${transaction.reference}`);
      } catch (error) {
        console.error(`[Job] Failed to verify ${transaction.reference}:`, error.message);
      }
    }
  });
};