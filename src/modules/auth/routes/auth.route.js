import { Router } from "express";
import registerUser from "../controllers/registerController.js";
import { store } from "../controllers/authController.js";
import { getProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import emailVerified from "../middleware/email.middleware.js";
import {
  store as getOtp,
  destroy as verifyOtp,
} from "../controllers/otp.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/", store);
authRouter.get("/", authMiddleware, emailVerified, getProfile);
authRouter.post("/otp", authMiddleware, getOtp);
authRouter.delete("/otp", authMiddleware, verifyOtp);
export default authRouter;
