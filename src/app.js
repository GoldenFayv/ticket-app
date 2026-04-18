import express from "express";
import authRouter from "./modules/auth/routes/auth.route.js";
import authMiddleware from "./modules/auth/middleware/auth.middleware.js";
import eventRouter from "./modules/event/routes/event.route.js";
import emailVerified from "./modules/auth/middleware/email.middleware.js";

const app = express();

app.use(express.json()); //middleware to parse json data

app.use("/api/auth", authRouter);
app.use("/api/events", authMiddleware, emailVerified, eventRouter);

export default app;
