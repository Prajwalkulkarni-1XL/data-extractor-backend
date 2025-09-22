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

const createCategoryCollection = asyncHandler(async (req, res) => {
  const { websiteKey } = req.params;

  const Category = getCategoryModel(websiteKey);

  await Category.createCollection();

  res.json({
    success: true,
    message: `Collection 'category_${websiteKey}' created successfully.`,
  });
});

const addCategories = asyncHandler(async (req, res) => {
  const { websiteKey } = req.params;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "File is required" });
  }

  const Category = getCategoryModel(websiteKey);

  let categories;
  try {
    categories = JSON.parse(req.file.buffer.toString("utf-8"));
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid JSON file" });
  }

  if (!Array.isArray(categories)) {
    return res.status(400).json({ success: false, message: "JSON must be an array" });
  }

  // Filter + clean
  const validCategories = categories
    .filter((c) => c.categoryName && c.categoryUrl)
    .map((c) => ({
      categoryName: c.categoryName.trim(),
      categoryUrl: c.categoryUrl.trim(),
    }));

  if (!validCategories.length) {
    return res.status(400).json({ success: false, message: "No valid categories found" });
  }

  // Insert, ignore duplicates
  await Category.insertMany(validCategories, { ordered: false });

  res.json({
    success: true,
    message: `${validCategories.length} categories added successfully`,
  });
});


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

export { getNextCategory, unlockCategory, createCategoryCollection, addCategories }