import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.js";
import router from "./src/routes/index.js";
import  errorHandler  from "./src/utils/errorHandler.js";
import "./src/cron/cronJobs.js"; // Import the cron job

// Initialize dotenv
dotenv.config();

const app = express();

// Use CORS middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://your-production-site.com"], // Allow multiple origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Use the routes from the router index file
app.use("/v1/api", router);

app.use(errorHandler);  // Pass errors to the error handler middlewar
// Define a test route
app.get("/health", (req, res) => {
  res.send("Backend is healthy");
});

// Handle 404 errors
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});
