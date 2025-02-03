import express from "express";
import UserController from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = express.Router();

// User routes
userRouter.post("/", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.put("/:userId", verifyToken, UserController.updateUser);
userRouter.delete("/:userId", verifyToken, UserController.deleteUser);

export default userRouter;
