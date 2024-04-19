const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

// Arg received ONLY from User Login
function issueJWT(user) {
  const expiresIn = "1d";

  const payload = {
    id: user._id,
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
