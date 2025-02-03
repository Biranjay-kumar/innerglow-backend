import cron from "node-cron";
import User from "../models/userModel.js";
import connectDB from "../config/database.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Connect to the database
await connectDB();

// Function to reset payment status
const resetPaymentStatus = async () => {
  try {
    console.log("Running cron job: Resetting payment status...");
    await User.updateMany({}, { paymentStatus: "Pending" });
    console.log("Payment statuses updated successfully.");
  } catch (error) {
    console.error("Error updating payment statuses:", error);
  }
};

// Schedule cron job: Runs at 12:00 AM on the 1st of every month
cron.schedule("0 0 1 * *", resetPaymentStatus);

console.log("Cron job scheduled: Resets payment status at the start of each month.");
