import { Router } from "express";
import { getCategory, getNextCategory, unlockCategory } from "../controllers/category.controller.js";

const router = Router();

router.route("/").get(getCategory);
router.route("/next").get(getNextCategory);
router.route("/unlock").get(unlockCategory);

export default router;
