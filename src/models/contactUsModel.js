import mongoose from 'mongoose';

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name should be at least 2 characters long."],
      maxlength: [100, "Name should not exceed 100 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [10, "Message should be at least 10 characters long."],
      maxlength: [1000, "Message should not exceed 1000 characters."],
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processed", "Closed"],
      default: "Pending", // Status to track the processing stage
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Add indexes for performance (email and status)
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
