const authenticateToken = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const registerUser = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = new User({
      name,
      email,
      password,
      passwordConfirm,
    });

    await user
      .save()
      .then(() => {
        const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN,
        });

        res.status(201).json({ user, token });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Error saving user",
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({ message: "Succesfull login", user, token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, authenticateToken };
