// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user"); // adjust the path if needed

// DELETE Vendor by ID
router.delete("/admin/delete-vendor/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;

    const deletedVendor = await User.findByIdAndDelete(vendorId);

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
