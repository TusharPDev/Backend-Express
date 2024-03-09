import express from "express";

const app = express();

// Middleware function for logging
const logMiddleware = (req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next(); // Move to the next middleware in the chain
};

// Middleware function for authentication
const authMiddleware = (req, res, next) => {
  console.log("Authentication middleware");
  next(); // Move to the next middleware in the chain
};

// Route-level middleware for '/protected' route
app.get("/protected", authMiddleware, (req, res) => {
  console.log("Protected route accessed successfully");
  res.send("Protected route accessed successfully");
});

// Route-level middleware for '/admin' route
app.get("/admin", logMiddleware, (req, res) => {
  console.log("Admin panel accessed successfully");
  res.send("Admin panel accessed successfully");
});

// Route without middleware
app.get("/", (req, res) => {
  console.log("Hello World route accessed");
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
