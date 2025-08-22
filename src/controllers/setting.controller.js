import { Setting } from "../models/setting.model.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { ApiError } from "../utility/apiError.js";

const getSettingData = asyncHandler(async (req, res) => {
  const setting = await Setting.find();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        setting,
      },
      "Setting data retrieved successfully"
    )
  );
});

const addSettingData = asyncHandler(async (req, res) => {
  const { lastRecordFound, needleCount } = req.body;

  if (!url) {
    throw new ApiError("URL is required", 400);
  }

  const setting = new Setting({ lastRecordFound, needleCount });
  await setting.save();

  return res
    .status(201)
    .json(new ApiResponse(200, null, "Scrapped data added successfully"));
});

const updateSettingData = asyncHandler(async (req, res) => {
  const { lastRecordFound, needleCount } = req.body;

  if (!lastRecordFound || !needleCount) {
    throw new ApiError(
      "Both lastRecordFound and needleCount are required",
      400
    );
  }

  const setting = await Setting.findOneAndUpdate(
    {},
    { lastRecordFound, needleCount },
    { new: true, upsert: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { setting }, "Setting data updated successfully")
    );
});

export { getSettingData, addSettingData, updateSettingData };
