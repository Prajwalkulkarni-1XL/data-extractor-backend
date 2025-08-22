import Category from "../models/category.model.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";

const createCategory = async (req, res) => { }

const getCategory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;

  const categories = await Category.find()
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const totalCount = await Category.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        categories,
        totalCount,
        totalPages,
        currentPage: Number(page),
      },
      "Categories data retrieved successfully"
    )
  );
});

export { createCategory, getCategory }