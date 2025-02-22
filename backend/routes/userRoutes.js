const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// Ensure JWT Secret is defined
if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

// Signup Route
router.post("/signup", async (req, res) => {
  console.log("Signup route hit", req.body);
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create new user
    user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // Changed from email to username

    // Find user by username instead of email
    const user = await User.findOne({ username }).select("+password");
    if (!user)
      return res
        .status(404)
        .json({ message: "Username not found. Try again." });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Wrong password. Try again." });

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email, // Still included in response
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Protected Route: Get User Info
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access Denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password

    if (!user)
      return res
        .status(404)
        .json({ message: "Username not found. Try again." });

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
});

module.exports = router;
