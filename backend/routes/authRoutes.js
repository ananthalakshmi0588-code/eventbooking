const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Register
router.post("/register", async (req, res) => {
  console.log("Incoming body:", req.body);

  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    console.log("User created successfully");

    res.status(201).json({
      success: true,
      message: "Registration Successful",
    });

  } catch (err) {
    console.error("REGISTER ERROR:");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email:", email);

    const user = await User.findOne({ email });

    console.log("User:", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await user.comparePassword(password);

    console.log("Password Match:", match);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Password Incorrect",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
// Get All Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;