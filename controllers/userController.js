const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    // You can add additional validation or checks here

    // Create a new user instance
    const user = new User({
      name,
      email,
      password,
      passwordConfirm,
    });
    console.log(user);
    // Save the user to the database
    user
      .save()
      .then(() => {
        res.status(200).json({
          success: true,
          message: "User saved successfully",
          user: user,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Error saving user",
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    // You can add additional validation or checks here

    // Find the user by username
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Check the password
    const isPasswordValid = await user.comparePassword(password);

    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate an authentication token or session

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error getting users" });
  }
};
