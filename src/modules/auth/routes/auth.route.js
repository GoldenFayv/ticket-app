import { Router } from "express";
import registerUser from "../controllers/registerController.js";
import { store } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/", store);

export default authRouter;
