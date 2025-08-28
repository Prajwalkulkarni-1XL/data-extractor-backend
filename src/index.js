import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import https from "https";
import fs from "fs";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {

    // Self-signed SSL certificate for local testing
    const sslOptions = {
      key: fs.readFileSync("./certs/private.key"),
      cert: fs.readFileSync("./certs/certificate.crt"),
    };

    https.createServer(sslOptions, app).listen(process.env.PORT, () => {
      console.log(`🔒 HTTPS server running at https://localhost:${process.env.PORT}`);
    });

    // app.listen(process.env.PORT || 8000, () => {
    //   console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    // });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
