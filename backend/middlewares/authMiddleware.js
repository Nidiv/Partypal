const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const { debug } = require("request");

dotenv.config();

exports.verifyAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);

    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

exports.verifyVendor = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || user.role !== "vendor") {
      return res.status(403).json({ message: "Access denied. Vendor only." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error.message });
  }
};
