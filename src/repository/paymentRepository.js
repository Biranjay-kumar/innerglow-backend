import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";

class PaymentRepository {
  async createPayment(data) {
    try {
      // Ensure the user exists before creating the payment
      const user = await User.findById(data.userId);
      if (!user) {
        throw new Error("User not found.");
      }

      // Create and save the payment
      const payment = new Payment(data);
      await payment.save();
      return payment;
    } catch (error) {
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
