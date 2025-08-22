import { Router } from "express";
import { insertError } from "../controllers/err.controller.js";

const router = Router();

router.route("/").post(insertError);


export default router;
