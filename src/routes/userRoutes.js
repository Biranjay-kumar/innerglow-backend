import express from "express";
import UserController from "../controllers/userController.js";

const userRouter = express.Router();

// User routes
userRouter.post("/", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.put("/:userId", UserController.updateUser);
userRouter.delete("/:userId", UserController.deleteUser);

export default userRouter;
