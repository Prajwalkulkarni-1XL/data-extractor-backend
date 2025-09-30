import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { websiteKeyChecker } from "./middlewares/websiteKeyChecker.middleware.js";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import propertyRouter from "./routes/property.route.js";
import errorController from "./controllers/error.controller.js";
import categoryRouter from "./routes/category.route.js";

import errorRouter from "./routes/errorLog.route.js";

//routes declaration
app.use("/api/property/:websiteKey", websiteKeyChecker, propertyRouter);
app.use("/api/category/:websiteKey", websiteKeyChecker, categoryRouter)
app.use("/api/error/:websiteKey", websiteKeyChecker, errorRouter);
app.get("/api/healthcheck", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running smoothly",
  });
});

app.use(errorController)

export { app };
