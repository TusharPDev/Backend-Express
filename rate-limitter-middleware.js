import express from "express";

const app = express();

const rateLimit = (limit, windowMs) => {
  let requests = {};
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Remove old entries from the requests object
    for (const timestamp in requests) {
      if (
        requests.hasOwnProperty(timestamp) &&
        parseInt(timestamp) < windowStart
      ) {
        delete requests[timestamp];
      }
    }

    // Count requests from this IP within the window
    if (requests[ip]) {
      requests[ip]++;
    } else {
      requests[ip] = 1;
    }

    // Check if the request limit has been exceeded
    if (requests[ip] > limit) {
      return res
        .status(429)
        .json({ error: "Too many requests. Please try again later." });
    }

    // Proceed with the next middleware
    next();
  };
};

app.use(rateLimit(5, 60000)); // Limit to 5 requests per minute

app.get("/api/data", (req, res) => {
  res.json({ message: "This is your data." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
