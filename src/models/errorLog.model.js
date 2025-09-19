import mongoose from "mongoose";

const errorSchema = new mongoose.Schema(
  {
    websiteKey: { type: String },
    data: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

// TTL index: delete documents older than 7 days
errorSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

const ErrorLog = mongoose.model("ErrorLog", errorSchema);
export default ErrorLog;
