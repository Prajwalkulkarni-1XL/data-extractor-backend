import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { ApiError } from "../utility/apiError.js";
import ErrorLog from "../models/errorLog.model.js";
import propertySchema from "../models/property.schema.js";
import categorySchema from "../models/category.schema.js";
import mongoose from "mongoose";

const normalizeKey = (key) => key.trim().toLowerCase();

const getPropertyModel = (websiteKey) => {
  const normalizedKey = normalizeKey(websiteKey);
  const modelName = `property_${normalizedKey}`;
  if (mongoose.models[modelName]) return mongoose.models[modelName];
  return mongoose.model(modelName, propertySchema, modelName);
};

const getCategoryModel = (websiteKey) => {
  const normalizedKey = normalizeKey(websiteKey);
  const modelName = `category_${normalizedKey}`;
  if (mongoose.models[modelName]) return mongoose.models[modelName];
  return mongoose.model(modelName, categorySchema, modelName);
};

const addPropertyData = asyncHandler(async (req, res) => {
  const { websiteKey } = req.params;
  const { url, deviceId, data } = req.body;

  if (!url) {
    throw new ApiError(400, "URL is required");
  }

  const Property = getPropertyModel(websiteKey);
  const Category = getCategoryModel(websiteKey);

  const existingData = await Property.findOne({ url });
  
  if (existingData && existingData.data) {
    await ErrorLog.create({
      websiteKey,
      data: { message: "Attempt to add duplicate URL", url },
    });
    throw new ApiError(400, "Data for this URL already exists");
  } else if (existingData && !existingData.data) {
    existingData.data = data;
    await existingData.save();
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Property data updated successfully"));
  }

  const category = await Category.findOne({ isLocked: true, lockedBy: deviceId });
  if (category) {
    data.category = category.categoryName;
  }

  data.deviceId = deviceId;

  const scrappedData = new Property({ url, data });
  await scrappedData.save();

  return res
    .status(201)
    .json(new ApiResponse(200, null, "Property data added successfully"));
});

export { addPropertyData };
