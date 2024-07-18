const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const PRIV_KEY = process.env.JWT_PRIVATE_KEY;

// user param only from USER LOGIN / NOT sign-up
function issueJWT(res, user) {
  const _id = user._id;
  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };
  console.log(PRIV_KEY);

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  res.cookie("jwt", signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn: expiresIn,
  };
}

module.exports.issueJWT = issueJWT;
