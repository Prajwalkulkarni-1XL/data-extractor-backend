import { Router } from "express";
import { getScrappedData, addScrappedData } from "../controllers/scrapped.controller.js";

const router = Router();

router.route("/").get(getScrappedData).post(addScrappedData);


export default router;
