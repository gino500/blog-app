const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const path = require("path");
// .env
require("dotenv").config();

const app = express();

// Config DB
require("./config/database");

// Models
require("./models/blogs");
require("./models/comments");
require("./models/users");

// Insert passport global object
require("./config/passport")(passport);

// Import Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const blogsRouter = require("./routes/blogs");

// Middleware
app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.json(err.status || 500);
});

module.exports = app;
