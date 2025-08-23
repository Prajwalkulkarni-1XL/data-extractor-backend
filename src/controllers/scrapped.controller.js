import { ScrappedData } from "../models/scrapped.model.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { ApiError } from "../utility/apiError.js";
import Error from "../models/error.model.js";

const getScrappedData = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const scrappedData = await ScrappedData.find()
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const totalCount = await ScrappedData.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        scrappedData,
        totalCount,
        totalPages,
        currentPage: Number(page),
      },
      "Scrapped data retrieved successfully"
    )
  );
});

const addScrappedData = asyncHandler(async (req, res) => {
  const { url, data } = req.body;

  if (!url) {
    throw new ApiError(400, "URL is required");
  }

  const existingData = await ScrappedData.findOne({ url });
  if (existingData && existingData.data) {
    await Error.create({ data: { message: "Attempt to add duplicate URL", url } });
    throw new ApiError(400, "Data for this URL already exists");
  } else if (existingData && !existingData.data) {
    existingData.data = data;
    await existingData.save();
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Scrapped data updated successfully"));
  }

  const scrappedData = new ScrappedData({ url, data });
  await scrappedData.save();

  return res
    .status(201)
    .json(new ApiResponse(200, null, "Scrapped data added successfully"));
});

export { getScrappedData, addScrappedData };
