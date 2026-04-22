import { Router } from "express";
import { store } from "../controllers/checkout.controller.js";

const checkoutRouter = Router();

checkoutRouter.post("/", store);

export default checkoutRouter;
