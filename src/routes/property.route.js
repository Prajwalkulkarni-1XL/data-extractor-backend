import { Router } from "express";
import { addPropertyData, createPropertyCollection } from "../controllers/property.controller.js";

const router = Router({ mergeParams: true })

router.route("/").post(addPropertyData);
router.post("/create-collection", createPropertyCollection);

export default router;
