const jwt = require("jsonwebtoken");
const config = require("config");

// This app is expecting jwt stored in request header "x-auth-token"
const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access denied, no token provided.");

  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload;
    next();
  }
  catch (ex) {
    res.status(400).send("Bad request: invalid token.");
  }
};

module.exports = auth;
