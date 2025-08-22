import mongoose, { Schema } from "mongoose";

const settingDataSchema = new Schema(
  {
    lastRecordFound: {
      type: String,
    },
    needleCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Setting = mongoose.model("Setting", settingDataSchema);
