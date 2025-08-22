import mongoose, { Schema } from "mongoose";

const scrappedDataSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    data: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

export const ScrappedData = mongoose.model("ScrappedData", scrappedDataSchema);
