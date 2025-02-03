import express from "express";
import BatchController from "../controllers/batchController.js";
import verifyToken from "../middlewares/verifyToken.js";

const batchRouter = express.Router();

// Route to create a new batch
batchRouter.post("/", BatchController.create);

// Route to get all batches
batchRouter.get("/", BatchController.getBatch);
batchRouter.get("/my-bacth", verifyToken,BatchController.mybatch);

// Route to get a batch by ID
batchRouter.get("/:batchId", BatchController.getById);

// Route to update a batch
batchRouter.patch("/:batchId", BatchController.updateBatch);

batchRouter.put("/:batchId", verifyToken, BatchController.enrollInBatch);

// Route to delete a batch
batchRouter.delete("/:batchId", verifyToken, BatchController.deleteBatch);

export default batchRouter;
