// paymentSchema.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// Payment Schema
const paymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  email: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    default: 500,
  },
  status: {
    type: String,
    enum: ["Success", "Failure", "Pending"],
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
  },
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
    required: false,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
