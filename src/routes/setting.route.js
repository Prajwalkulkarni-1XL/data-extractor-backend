import { Router } from "express";
import {
  getSettingData,
  addSettingData,
  updateSettingData,
} from "../controllers/setting.controller.js";

const router = Router();

router
  .route("/")
  .get(getSettingData)
  .post(addSettingData)
  .put(updateSettingData);

export default router;
