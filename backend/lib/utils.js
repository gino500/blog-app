const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// Private RSA Key
const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

// user param only from USER LOGIN / NOT sign-up
function issueJWT(user) {
  const _id = user._id;
  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn: expiresIn,
  };
}

module.exports.issueJWT = issueJWT;
