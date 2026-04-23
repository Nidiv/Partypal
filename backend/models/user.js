// user.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Don't return password by default
  },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },
  serviceType: {
    type: String,
    enum: ["catering", "sound", "venue"],
    required: function () {
      return this.role === "vendor";
    },
    default: undefined, // Prevents empty field for users
  },
  documents: {
    type: [String],
    default: undefined, // Prevents empty array in MongoDB
    validate: {
      validator: function (v) {
        return this.role !== "vendor" || (v && v.length > 0 && v.length <= 2);
      },
      message: "Vendors can upload maximum 2 documents",
    },
  },
  isApproved: {
    type: Boolean,
    default: false, // 🔹 Vendors require admin approval before login
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

module.exports = mongoose.model("User", userSchema);
