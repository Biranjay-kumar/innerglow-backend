import UserService from "../services/userService.js";

class PaymentController {
  // Create a new payment for a user
  async createPayment(req, res, next) {
    try {
      const   userId   = req.userId;  
      // console.log(userId);
      const paymentData = req.body;

      // Create the payment
      const payment = await UserService.createPayment(userId, paymentData);
      
      return res.status(201).json({
        success: true,
        message: "Payment created successfully",
        data: payment,
      });
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }

  // Get all payments for a user
  async getPaymentsByUser(req, res, next) {
    try {
      const { userId } = req.params; // Get userId from route parameter
      const payments = await UserService.getUserPayments(userId);
      
      if (!payments || payments.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No payments found for this user",
        });
      }

      return res.status(200).json({
        success: true,
        data: payments,
      });
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }
}

export default new PaymentController();
