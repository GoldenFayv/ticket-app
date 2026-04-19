import { Router } from "express";
import authMiddleware from "../../auth/middleware/auth.middleware.js";
import {
  store as createEvent,
  index,
  show,
  update,
} from "../controllers/event.controller.js";
import emailVerified from "../../auth/middleware/email.middleware.js";

const eventRouter = Router();

eventRouter.post("/", authMiddleware, emailVerified, createEvent);
eventRouter.get("/", index);
eventRouter.get("/:id", show);
eventRouter.put("/:eventId", authMiddleware, emailVerified, update);
// eventRouter.get("/mine")
export default eventRouter;
