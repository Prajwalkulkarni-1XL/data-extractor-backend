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

const getNextCategory = async (req, res) => {
  const deviceId = req.query.deviceId;

  try {
    const category = await Category.findOneAndUpdate(
      {
        isLocked: false,
        lockedBy: null,
      },
      {
        isLocked: true,
        lockedBy: deviceId,
        lockedAt: new Date(),
      },
      { new: true }
    );

    if (!category) {
      return res.json({ success: false, message: "No available categories." });
    }

    res.json({ success: true, data: category });
  } catch (err) {
    console.error("Error fetching next category:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const unlockCategory = async (req, res) => {
  const { deviceId, categoryId } = req.body;

  try {
    await Category.findOneAndUpdate(
      { lockedBy: deviceId, _id: categoryId, isLocked: true },
      {
        isLocked: false,
      }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export { createCategory, getCategory, getNextCategory, unlockCategory }