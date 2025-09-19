import categorySchema from "../models/category.schema.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import mongoose from "mongoose";

// Dynamic model generator
const getCategoryModel = (websiteKey) => {
  const normalizedKey = websiteKey.trim().toLowerCase();
  const modelName = `category_${normalizedKey}`;
  if (mongoose.models[modelName]) return mongoose.models[modelName];
  return mongoose.model(modelName, categorySchema, modelName);
};

const getNextCategory = asyncHandler(async (req, res) => {
  const { websiteKey } = req.params;
  const { deviceId } = req.query;

  const Category = getCategoryModel(websiteKey);

  const category = await Category.findOneAndUpdate(
    { isLocked: false, lockedBy: null },
    { isLocked: true, lockedBy: deviceId, lockedAt: new Date() },
    { new: true }
  );

  if (!category) {
    return res.json({ success: false, message: "No available categories." });
  }

  res.json({ success: true, data: category });
});

const unlockCategory = asyncHandler(async (req, res) => {
  const { websiteKey } = req.params;
  const { deviceId, categoryId } = req.body;

  const Category = getCategoryModel(websiteKey);

  await Category.findOneAndUpdate(
    { _id: categoryId, lockedBy: deviceId, isLocked: true },
    { isLocked: false }
  );

  res.json({ success: true });
});

export { getNextCategory, unlockCategory }