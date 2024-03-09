import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// app.listen(3000);

//works on any type of request
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

//works only on get request
app.get('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})