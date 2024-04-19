const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

/* GET home page. */
router.get("/", asyncHandler(async (req, res, next) => {
    res.status(200).json("GET index");
  })
);

module.exports = router; 
