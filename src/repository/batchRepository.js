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
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const currentMonth = new Date().getMonth(); // Get current month (0-indexed)
      
      let batch = await Batch.findById(batchId).session(session);
      let student = await User.findById(studentId).session(session);
  
      if (!student) {
        throw new Error("Student not found");
      }
  
      if (!batch) {
        throw new Error("Batch not found");
      }
  
      // If student is already enrolled and it's the same month, don't allow changing batches
      if (student.enrollmentMonth === currentMonth) {
        // Check if the student is already enrolled in the current batch
        if (batch.users.some((id) => id.toString() === studentId)) {
          throw new Error("Student is already enrolled in this batch for the current month");
        } else {
          throw new Error("Student cannot switch batches within the same month");
        }
      }
  
      // If student is enrolled in a previous month's batch, remove them from that batch
      if (student.batch && student.enrollmentMonth !== currentMonth) {
        let previousBatch = await Batch.findById(student.batch).session(session);
        if (previousBatch) {
          // Remove the student from the previous batch and update availableSlots
          previousBatch.users = previousBatch.users.filter(
            (id) => id.toString() !== studentId
          );
          previousBatch.availableSlots += 1;  // Add slot back to the previous batch
          await previousBatch.save({ session });
        }
      }
  
      // Check if there are available slots in the selected batch
      if (batch.availableSlots > 0) {
        // Add student to the new batch and update availableSlots
        batch.users.push(studentId);
        batch.availableSlots -= 1;  // Decrease slot in the current batch
        student.batch = batch._id;
        student.enrollmentMonth = currentMonth; // Mark the enrollment month
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
