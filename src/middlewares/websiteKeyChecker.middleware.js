import { asyncHandler } from "../utility/asyncHandler.js";

export const websiteKeyChecker = asyncHandler((req, res, next) => {
  const { websiteKey } = req.params;

  console.log(websiteKey)

  if (!websiteKey || websiteKey === null || websiteKey === "null" || websiteKey === undefined || websiteKey === "undefined" || websiteKey === ":websiteKey") {
    return res.status(400).json({ success: false, message: "Website key cannot be null or undefined or :websiteKey" });
  }

  next();
});
