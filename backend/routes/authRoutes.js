const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Seed default admin if missing
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const admin = new User({
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin",
      });
      await admin.save();
      console.log("Default Admin Seeded: admin@gmail.com / admin123");
    }
  } catch (err) {
    console.error("Admin Seeding Error:", err.message);
  }
};
seedAdmin();

// Register
router.post("/register", async (req, res) => {
  console.log("Incoming body:", req.body);

  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const exists = await User.findOne({
      email: { $regex: new RegExp("^" + cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "$", "i") }
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = new User({
      name: name.trim(),
      email: cleanEmail,
      password,
    });

    await user.save();

    console.log("User created successfully:", cleanEmail);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

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

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter both email and password",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    console.log("Login attempt email:", cleanEmail);

    const user = await User.findOne({
      email: { $regex: new RegExp("^" + cleanEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "$", "i") }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `No account found for "${email.trim()}". Check for typos (e.g. gmail.com) or register a new account.`,
      });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
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