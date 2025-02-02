import express from "express";
import paymentController from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/", paymentController.createPayment); 
paymentRouter.get("/", paymentController.getPaymentsByUser); 

export default paymentRouter;
