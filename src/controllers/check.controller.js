import { Setting } from "../models/setting.model.js";
import { ScrappedData } from "../models/scrapped.model.js";
import axios from "axios";
import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { ApiError } from "../utility/apiError.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startScraping = async (req, res, next) => {
  try {
    const setting = await Setting.findOne({});
    let lastId = parseInt(setting?.lastRecordFound || "13279700");

    for (let i = 0; i < setting.needleCount; i++) {
      const idToCheck = lastId + i;
      await check(idToCheck);
      await sleep(10000); // Delay 10 second
    }

    res.status(200).json({
      success: true,
      message: "Scraping completed with delay.",
    });
  } catch (error) {
    next(error);
  }
};

const check = async (id) => {
  const url = `https://www.bayut.com/property/details-${id}.html`;

  try {
    const response = await axios.get(url);

    // Check if the page content indicates a valid page
    if (response.status === 200) {
      // Save the last found record
      await Setting.findOneAndUpdate(
        {},
        { lastRecordFound: id },
        { upsert: true, new: true }
      );

      // insert to database
      // const scrappedData = new ScrappedData({ url });
      // await scrappedData.save();
    }
  } catch (error) {
    // Handle the error, e.g., log it or ignore it
    console.error(`Error checking ID ${id}:`, error.message);
  }
};

export { startScraping };
