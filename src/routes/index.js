import express from "express";
import userRoute from "./userRoutes.js"; 
import batchRouter from "./batchRouter.js";
import paymentRouter from "./paymentRouter.js";
import couponRouter from "./couponRouter.js";

const router = express.Router();

// Define routes
router.use("/user", userRoute);
router.use("/batch", batchRouter);
router.use("/payment", paymentRouter);
router.use("/coupon", couponRouter);

export default router;
