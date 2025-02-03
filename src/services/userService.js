import paymentRepository from "../repository/paymentRepository.js";
import userRepository from "../repository/userRepository.js";
import { generateAndSaveOtp } from "../utility/otpAgencyUtility.js";
import { sendEmail } from "../utility/sendEmailVerification.js";
import { hashPassword, comparePassword } from "../utils/hashUtils.js"; // Assuming comparePassword function exists

class UserService {
  async registerUser(data) {
    try {
      // Hash password before saving
      data.password = await hashPassword(data.password);

      // Attempt to create the user
      const user = await userRepository.createUser(data);

      // Prepare OTP and send it via email
      await generateAndSaveOtp(user, "register"); // Now awaiting OTP generation

      return { success: true, data: user };
    } catch (error) {
      // Check if the error is related to a duplicate email
      if (error.message.includes("duplicate key error")) {
        throw new Error("Email is already registered.");
      }
      // For all other errors, provide a generic message
      throw new Error("Error registering user: " + error.message);
    }
  }

  // Login user
  async loginUser(email, password) {
    try {
      // Find user by email
      const user = await userRepository.findUserByEmail(email);
      if (!user) {
        throw new Error("Email not found.");
      }

      if(!user.isVerified) {
        throw new Error("Email not verified.");
      }

      // Compare the entered password with the stored hash
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password.");
      }

      // If everything is valid, return the user
      return { success: true, data: user };
    } catch (error) {
      // Handle errors appropriately
      throw new Error("Error logging in: " + error.message);
    }
  }

  async getUserByEmail(email) {
    try {
      return await userRepository.findUserByEmail(email);
    } catch (error) {
      throw new Error("Error retrieving user by email: " + error.message);
    }
  }

  async getUserById(userId) {
    try {
      return await userRepository.findUserById(userId);
    } catch (error) {
      throw new Error("Error retrieving user by ID: " + error.message);
    }
  }

  async updateUser(userId, data) {
    try {
      // Additional logic can be added here
      return await userRepository.updateUser(userId, data);
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(userId) {
    try {
      return await userRepository.deleteUser(userId);
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  async createPayment(userId, paymentData) {
    try {
      // Add userId to the payment data
      paymentData.userId = userId;
      const payment = await paymentRepository.createPayment(paymentData);
      return payment;
    } catch (error) {
      throw new Error("Error creating payment: " + error.message);
    }
  }

  async getUserPayments(userId) {
    try {
      const payments = await paymentRepository.findPaymentsByUserId(userId);
      return payments;
    } catch (error) {
      throw new Error("Error retrieving payments for user: " + error.message);
    }
  }

  async verifyUser(email, otp){
    try {
      const user = await userRepository.verifyUser(email, otp);
      if(!user){
        throw new Error('Invalid OTP');
      }
      return user;
    } catch (error) {
      throw new Error("Error verifying user: " + error.message);
    }
  }
}

export default new UserService();
