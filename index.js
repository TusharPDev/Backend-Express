import express from "express";
import { apiKeyMiddleware, limiter } from "./apiKeyMiddleware.js";

const app = express();

app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);

const API_KEY = "secretapikey";
app.use((req, res, next) => {
  req.headers["x-api-key"] = API_KEY;
  console.log("x-api-key:", req.headers["x-api-key"]); 
  next();
});

app.use(limiter);

app.use(apiKeyMiddleware);

app.get("/", (req, res) => {
  res.send("API key validation successful! You can access this resource.");
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
