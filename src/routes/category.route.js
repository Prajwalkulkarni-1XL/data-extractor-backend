import { Router } from "express";
import { getCategory, getNextCategory, unlockCategory } from "../controllers/category.controller.js";

const router = Router();

router.route("/").get(getCategory);
router.route("/next").get(getNextCategory);
router.route("/unlock").post(unlockCategory);

export default router;
