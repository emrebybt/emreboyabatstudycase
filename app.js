const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const verifyToken = require('./middlewares/verify-token');
const usersRouter = require("./routes/users");
const restaurantsRouter = require("./routes/restaurants");
const commentRouter = require("./routes/comments");
const orderRouter = require('./routes/orders');

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/StudyCase")
  .then(() => {
    console.log("mongodb connected.");
  })
  .catch((err) => {
    console.log("mongodb connection error: ", err);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/users", usersRouter);
app.use('/api', verifyToken)
app.use("/api/comments", commentRouter);
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/orders", orderRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
