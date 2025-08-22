import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import scrapDataRouter from "./routes/scrapped.route.js";
import settingRouter from "./routes/setting.route.js";
import errorController from "./controllers/error.controller.js";
import categoryRouter from "./routes/category.route.js";

import errorRouter from "./routes/error.route.js";

//routes declaration
app.use("/api/scrapData", scrapDataRouter);
app.use("/api/category", categoryRouter)
app.use("/api/err", errorRouter);
app.use("/api/setting", settingRouter)
app.get("/api/healthcheck", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running smoothly",
  });
});

app.use(errorController)

export { app };
