import batchRepository from "../repository/batchRepository.js";


class BatchService {
  // Register a new batch
  async createBatch(data) {
    try {
      return await batchRepository.createBatch(data);
    } catch (error) {
      throw new Error("Service Error: " + error.message);
    }
  }

  // Get all batches
  async getAllBatches() {
    try {
      return await batchRepository.findAllBatches();
    } catch (error) {
      throw new Error("Service Error: " + error.message);
    }
  }

  // Get a batch by ID
  async getBatchById(batchId) {
    try {
      return await BatchRepository.findBatchById(batchId);
    } catch (error) {
      throw new Error("Service Error: " + error.message);
    }
  }

  // Update a batch
  async updateBatch(batchId, data) {
    try {
      return await BatchRepository.updateBatch(batchId, data);
    } catch (error) {
      throw new Error("Service Error: " + error.message);
    }
  }

  // Delete a batch
  async deleteBatch(batchId) {
    try {
      return await BatchRepository.deleteBatch(batchId);
    } catch (error) {
      throw new Error("Service Error: " + error.message);
    }
  }
}

export default new BatchService();
