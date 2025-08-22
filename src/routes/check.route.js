import express from "express";
import { startScraping } from "../controllers/check.controller.js";
const router = express.Router();

router.post("/check/", startScraping);

export default router;
