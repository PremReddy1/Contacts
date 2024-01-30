const jwt = require("jsonwebtoken");

const validate_Token = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_CODE, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User not Auth");
      }
      console.log(decoded);
      req.user = decoded.user;
      next();
    });
  }
  if (!token) {
    res.status(401);
    throw new Error("No Token provided.");
  }
};

module.exports = validate_Token;
