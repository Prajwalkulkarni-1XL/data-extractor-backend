import { Schema } from "mongoose";

const propertySchema = new Schema(
  {
    url: { type: String, required: true },
    data: { type: Object },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    isLiked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default propertySchema;
