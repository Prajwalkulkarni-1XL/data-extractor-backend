import mongoose from 'mongoose';

const errorSchema = new mongoose.Schema({
  // Store only the 'data' object
  data: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Error = mongoose.model('Error', errorSchema);

export default Error;