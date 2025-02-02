import express from "express";
import BatchController from "../controllers/batchController.js";

const batchRouter = express.Router();

// Route to create a new batch
batchRouter.post("/", BatchController.create);

// Route to get all batches
batchRouter.get("/", BatchController.getAll);

// Route to get a batch by ID
batchRouter.get("/:batchId", BatchController.getById);

// Route to update a batch
batchRouter.put("/:batchId", BatchController.update);

// Route to delete a batch
batchRouter.delete("/:batchId", BatchController.delete);

export default batchRouter;
