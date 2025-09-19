import { Router } from "express";
import { insertError } from "../controllers/errorLog.controller.js";

const router = Router({ mergeParams: true })

router.route("/").post(insertError);

export default router;
