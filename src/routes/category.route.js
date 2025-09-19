import { Router } from "express";
import { getNextCategory, unlockCategory } from "../controllers/category.controller.js";

const router = Router({ mergeParams: true })

router.route("/next").get(getNextCategory);
router.route("/unlock").post(unlockCategory);

export default router;
