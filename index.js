import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.js";
import router from "./src/routes/index.js";
import  errorHandler  from "./src/utils/errorHandler.js";
import "./src/cron/cronJobs.js"; // Import the cron job
import rateLimit from "express-rate-limit";

// Initialize dotenv
dotenv.config();

const app = express();

// Use CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["http://localhost:5173", "https://innerglow.netlify.app"];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Send rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiter to all routes
app.use(limiter);

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
