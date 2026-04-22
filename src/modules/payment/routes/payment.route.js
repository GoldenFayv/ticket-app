import { Router } from "express";
import { store, show } from "../controllers/payment.controller.js";

let paymentRouter = Router();

paymentRouter.post("/", store);
paymentRouter.get("/:reference", show);

export default paymentRouter;
