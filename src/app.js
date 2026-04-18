import express from 'express';
import authRouter from './modules/auth/routes/auth.route.js';

const app = express();

app.use(express.json()); //middleware to parse json data

app.use("/api/auth", authRouter)

export default app;