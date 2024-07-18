const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");

const PRIV_KEY = process.env.JWT_PRIVATE_KEY;

const protected = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, PRIV_KEY);

      req.user = await User.findById(decoded.sub).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports.protect = protected;
