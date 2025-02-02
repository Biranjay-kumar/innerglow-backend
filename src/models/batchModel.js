// batchSchema.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Batch Schema
const batchSchema = new Schema({
  name: {
    type: String,
    enum: ['6-7AM', '7-8AM', '8-9AM', '5-6PM'],
    required: true,
    unique: true
  },
  availableSlots: {
    type: Number,
    required: true,
    default: 30
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Batch = mongoose.model('Batch', batchSchema);
export default Batch;
