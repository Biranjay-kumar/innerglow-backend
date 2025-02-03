import mongoose from "mongoose";
import Batch from "../models/batchModel.js"; // Assuming Batch is your Mongoose model
import User from "../models/userModel.js";

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

  // enrollInBatch
  async enrollInBatch(batchId, studentId) {
    console.log("batchId", batchId);
    console.log("studentId", studentId);
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let batch = await Batch.findById(batchId).session(session);
      let student = await User.findById(studentId).session(session);

      if (!student) {
        throw new Error("Student not found");
      }

      if (!batch) {
        throw new Error("Batch not found");
      }

      // Check if the student is already in the current batch
      if (batch.users.some((id) => id.toString() === studentId)) {
        throw new Error("Student is already enrolled in this batch");
      }

      // If the student is already in another batch, remove them from that batch without slot adjustments
      if (student.batch) {
        let previousBatch = await Batch.findById(student.batch).session(
          session
        );
        if (previousBatch) {
          previousBatch.users = previousBatch.users.filter(
            (id) => id.toString() !== studentId
          );
          await previousBatch.save({ session });
        }
      }

      // Add student to the new batch only if there's an available slot
      if (batch.availableSlots > 0) {
        batch.users.push(studentId);
        student.batch = batch._id;
      } else {
        throw new Error("No available slots in the selected batch");
      }

      await student.save({ session });
      await batch.save({ session });

      await session.commitTransaction();
      session.endSession();

      return batch;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Error enrolling in batch: " + error.message);
    }
  }

  async mybatch(userId) {
    try {
      // Find the user by userId and populate the 'batch' reference with 'name'
      const user = await User.findById(userId)
        .populate("batch", "name")
        .populate("paymentHistory");
      // console.log("user: " + user);
      if (!user) {
        throw new Error("User not found");
      }

      // Now, 'user.batch' should already be populated with the 'name' of the batch
      if (!user.batch) {
        throw new Error("Batch not found");
      }

      // Return the populated batch directly
      return user.batch;
    } catch (error) {
      throw new Error("Error getting batch: " + error.message);
    }
  }
}

export default new BatchRepository();
