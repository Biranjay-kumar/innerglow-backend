import mongoose from "mongoose";
import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";

class PaymentRepository {
  async createPayment(data) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Ensure the user exists before creating the payment
      const user = await User.findById(data.userId).session(session);
      if (!user) {
        throw new Error("User not found.");
      }

      // Update payment status
      user.paymentStatus = "Paid";
      await user.save({ session });

      // Create and save the payment
      const payment = new Payment(data);
      await payment.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return payment;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error("Error creating payment: " + error.message);
    }
  }

  async findPaymentsByUserId(userId) {
    try {
      // Find all payments associated with the userId
      return await Payment.find({ userId });
    } catch (error) {
      throw new Error("Error finding payments: " + error.message);
    }
  }

  
}

export default new PaymentRepository();
