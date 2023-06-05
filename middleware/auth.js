// auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { JWT_SECRET } = process.env;

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticateToken;
