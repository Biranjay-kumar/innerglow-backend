// couponSchema.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Coupon Schema
const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountPercentage: {
    type: Number,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Expired'],
    default: 'Active'
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;
