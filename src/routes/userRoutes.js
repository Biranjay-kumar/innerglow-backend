import express from "express";
import UserController from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = express.Router();

// User routes
userRouter.post("/", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.put("/", verifyToken, UserController.updateUser);
userRouter.delete("/", verifyToken, UserController.deleteUser);
userRouter.patch("/verify-otp", UserController.verifyUser);

export default userRouter;
