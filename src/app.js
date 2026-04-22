import express from "express";
import authRouter from "./modules/auth/routes/auth.route.js";
import authMiddleware from "./modules/auth/middleware/auth.middleware.js";
import eventRouter from "./modules/event/routes/event.route.js";
import emailVerified from "./modules/auth/middleware/email.middleware.js";
import checkoutRouter from "./modules/checkout/routes/checkout.route.js";
import paymentRouter from "./modules/payment/routes/payment.route.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/payments", paymentRouter);

export default app;
