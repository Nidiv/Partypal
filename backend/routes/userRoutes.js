// userRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const dotenv = require("dotenv");
const multer = require("multer");
const { verifyAdmin } = require("../middlewares/authMiddleware"); // Middleware to verify admin

const enteredPassword = "password123"; // Change if needed
const storedHash =
  "$2b$10$gMYtPJyjORMQ77WAOSGTjOp4BYk650oZbWAc84g1C3fx1MxYWF8wG"; // Replace with actual hash

bcrypt.compare(enteredPassword, storedHash, (err, result) => {
  if (err) console.error("Error:", err);
  console.log("Password match:", result); // Should print true if correct
});

dotenv.config();
const router = express.Router();

// Ensure JWT Secret is defined
if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

// 🟢 Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure the "uploads" folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// 🟢 Signup Route with File Uploads
router.post("/signup", upload.array("documents", 2), async (req, res) => {
  console.log("Signup route hit", req.body);
  console.log("Uploaded Files:", req.files); // Debugging file uploads

  try {
    const { username, email, password, role, serviceType } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "vendor" && !serviceType) {
      return res
        .status(400)
        .json({ message: "Vendors must provide a serviceType" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({
      username,
      email,
      password: password,
      role,
      serviceType,
      isApproved: role === "vendor" ? false : true, // Vendors require approval
      documents: req.files ? req.files.map((file) => file.path) : [],
    });

    console.log("Before Saving User:", user);
    await user.save();
    res.status(201).json({
      message: "User registered successfully, pending approval if vendor",
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🔹 Login Route: Check Approval for Vendors
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // Changed from email to username

    const user = await User.findOne({ username }).select("+password");
    if (!user)
      return res
        .status(404)
        .json({ message: "Username not found. Try again." });

    // 🚨 Block unapproved vendors
    if (user.role === "vendor" && !user.isApproved) {
      return res
        .status(403)
        .json({ message: "Your account is pending approval." });
    }

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
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch all pending vendors (admin only)
router.get("/admin/pending-vendors", async (req, res) => {
  try {
    const pendingVendors = await User.find({
      role: "vendor",
      isApproved: false,
    });

    if (!pendingVendors.length) {
      return res.status(404).json({ message: "No pending vendors found" });
    }

    res.status(200).json(pendingVendors);
  } catch (error) {
    console.error("Error fetching pending vendors:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 🆕 Admin Route: Approve a Vendor
router.put("/admin/approve-vendor/:id", verifyAdmin, async (req, res) => {
  try {
    const vendor = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Protected Route: Get User Info
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access Denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
});

module.exports = router;
