import { Router } from "express";
import authMiddleware from "../../auth/middleware/auth.middleware.js";
import { store as createEvent } from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.post("/", createEvent);

export default eventRouter;
