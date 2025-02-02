import express from "express";
import paymentController from "../controllers/paymentController.js";
import verifyToken from "../middlewares/verifyToken.js";

const paymentRouter = express.Router();

paymentRouter.post("/", verifyToken, paymentController.createPayment); 
paymentRouter.get("/", paymentController.getPaymentsByUser); 

export default paymentRouter;
