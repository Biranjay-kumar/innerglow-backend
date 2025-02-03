import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [20, "Name cannot exceed 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  batch: {
    type: Schema.Types.ObjectId,
    ref: "Batch",
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending",
  },
  paymentHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: String,
    default: "",
  },
});

// Virtual field to calculate age
userSchema.virtual("age").get(function () {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
});

// Add validation for the age when saving
userSchema.pre("save", function (next) {
  const age = this.age;
  if (age < 18 || age > 65) {
    return next(new Error("Age must be between 18 and 65"));
  }
  next();
});

// Middleware to handle unique constraint errors
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    return next(
      new Error(
        `${
          duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)
        } is already registered.`
      )
    );
  }
  next(error);
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email }, // Payload: user ID and email
    process.env.JWT_SECRET, // Secret key from environment variable
    { expiresIn: "1h" } // Token expiry time (1 hour)
  );
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
