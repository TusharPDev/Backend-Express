import express from "express";
import rateLimit from "express-rate-limit";
const VALID_API_KEY = "secretapikey";

export function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(403).json({ error: "API key is missing" });
  }

  if (apiKey !== VALID_API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
}

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2, // Limit each IP to 2 requests per windowMs
  handler: function (req, res, next) {
    console.log("Rate limit exceeded for IP:", req.ip);
    res
      .status(429)
      .json({ error: "Too many requests, please try again later" });
  },

});
