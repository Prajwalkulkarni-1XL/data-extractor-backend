import { Router } from "express";
import { addPropertyData } from "../controllers/property.controller.js";

const router = Router({ mergeParams: true })

router.route("/").post(addPropertyData);

export default router;
