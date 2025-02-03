import batchService from "../services/batchService.js";
import BatchService from "../services/batchService.js";

class BatchController {
  // Create a new batch
  async create(req, res, next) {
    const { name, availableSlots } = req.body;

    try {
      const newBatch = await BatchService.createBatch({ name, availableSlots });
      return res.status(201).json({
        success: true,
        message: "Batch created successfully",
        data: newBatch,
      });
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  }

  // Get all batches
  async getBatch(req, res, next) {
    try {
      const userId = req.userId;
      const batches = await BatchService.getAllBatches();
      return res.status(200).json({
        success: true,
        message: "Batches retrieved successfully",
        data: batches,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get a batch by ID
  async getById(req, res, next) {
    const { batchId } = req.params;

    try {
      const batch = await BatchService.getBatchById(batchId);
      if (!batch) {
        return res.status(404).json({ error: "Batch not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Batch retrieved successfully",
        data: batch,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update a batch
  async updateBatch(req, res, next) {
    const { batchId } = req.params;
    const data = req.body;

    try {
      const updatedBatch = await BatchService.updateBatch(batchId, data);
      if (!updatedBatch) {
        return res.status(404).json({ error: "Batch not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Batch updated successfully",
        data: updatedBatch,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete a batch
  async deleteBatch(req, res, next) {
    const { batchId } = req.params;

    try {
      const deletedBatch = await BatchService.deleteBatch(batchId);
      if (!deletedBatch) {
        return res.status(404).json({ error: "Batch not found" });
      }
      return res.status(200).json({ message: "Batch deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  // enroll in a batch
  async enrollInBatch(req, res, next) {
    const batchId = req.params.batchId;
    const studentId = req.userId;
    // console.log("code came in controller 94")

    try {
      const enrolledBatch = await BatchService.enrollInBatch(
        batchId,
        studentId
      );
      if (!enrolledBatch) {
        return res.status(404).json({ error: "Batch not found" });
      }
      return res.status(200).json({
        success: true,
        message: "Enrollment successful",
        data: enrolledBatch,
      });
    } catch (error) {
      next(error);
    }
  }

  async mybatch(req, res, next) {
    const userId = req.userId;
    console.log(userId)
    try {
      const mybatch = await batchService.mybatch(userId);
      if (!mybatch) {
        return res.status(404).json({
          success: false,
          message: "pelase enroll in a batch",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Batch retrieved successfully",
        data: mybatch,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new BatchController();
