const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/order");

//Connect to mongodb
mongoose.connect('mongodb+srv://saptarshi:MongoDB1234@cluster0.kjyiblw.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
  console.log("Connected to db")
})
.catch((err)=>{
  console.log(err);
})

// Middleware to log incoming route of req
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handle CORS
app.use((req, res, next) => {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Acces-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  
  // Move on
  next();
});

// Middleware to forward incoming requests
app.use("/products", productRoutes);
app.use("/order", orderRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
