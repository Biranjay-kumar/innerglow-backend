import mongoose from "mongoose";  
import dotenv from 'dotenv';  
dotenv.config();



const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the DB_URL from environment variables
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error:", error);
    process.exit(1); // Exit the process with failure if connection fails
  }
};

// Export the connectDB function using ES module syntax
export default connectDB;
