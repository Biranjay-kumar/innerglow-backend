import express from "express";
import couponController from "../controllers/couponController.js";

const couponRouter = express.Router();

// User routes
couponRouter.post("/", couponController.create);
couponRouter.get("/", couponController.getCoupon);
couponRouter.put("/:couponId", couponController.update);
couponRouter.delete("/:couponId", couponController.delete);

export default couponRouter;
