import express from "express";

const app = express();


//This is a middle ware function
const myLoggerMiddleware = function (req, res, next) {
  console.log("LOGGED");
  next();
};

app.use(myLoggerMiddleware);

app.get("/", (req, res) => {
  res.send("Hey, hello this server listens to tushar!");
});

app.listen(3000, () => {
  console.log("Express server initialized");
});
