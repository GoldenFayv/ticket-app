import loadEnv from "./config/env.js";
import app from "./app.js";
import { verifyPendingTransactionsJob } from "./modules/payment/jobs/payment.job.js";

try {
  loadEnv();
  app.on("error", (error) => {
    console.error("Error starting the server: ", error);
    process.exit(1);
  });

  verifyPendingTransactionsJob(); // start the job

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting the server: ", error);
  process.exit(1);
}
