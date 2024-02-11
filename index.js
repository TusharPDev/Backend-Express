import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hey, hello this server listens to tushar!");
});

app.listen(3000, () => {
  console.log("Express server initialized");
});



