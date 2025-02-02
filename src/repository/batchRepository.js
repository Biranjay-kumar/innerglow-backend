import Batch from "../models/batchModel.js"; // Assuming Batch is your Mongoose model

class BatchRepository {
  // Create a new batch
  async createBatch(data) {
    try {
      const newBatch = new Batch(data);
      return await newBatch.save();
    } catch (error) {
      throw new Error("Error creating batch: " + error.message);
    }
  }

  // Find all batches
  async findAllBatches() {
    try {
      return await Batch.find();
    } catch (error) {
      throw new Error("Error fetching batches: " + error.message);
    }
  }

  // Find a batch by ID
  async findBatchById(batchId) {
    try {
      return await Batch.findById(batchId);
    } catch (error) {
      throw new Error("Error finding batch: " + error.message);
    }
  }

  // Update a batch by ID
  async updateBatch(batchId, data) {
    try {
      return await Batch.findByIdAndUpdate(batchId, data, { new: true });
    } catch (error) {
      throw new Error("Error updating batch: " + error.message);
    }
  }

  // Delete a batch by ID
  async deleteBatch(batchId) {
    try {
      return await Batch.findByIdAndDelete(batchId);
    } catch (error) {
      throw new Error("Error deleting batch: " + error.message);
    }
  }
}

export default new BatchRepository();
