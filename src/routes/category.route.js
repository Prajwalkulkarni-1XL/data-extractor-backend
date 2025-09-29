import { Router } from "express";
import { getNextCategory, unlockCategory, createCategoryCollection, addCategories } from "../controllers/category.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router({ mergeParams: true })

router.route("/create-collection").post(createCategoryCollection);
router.route("/next").get(getNextCategory);
router.route("/unlock").post(unlockCategory);
router.route("/add").post(upload.single("file"), addCategories);

export default router;
