const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Service = require("../models/service");

// GET /booking/vendor-bookings
router.get("/vendor-bookings", async (req, res) => {
  try {
    const vendorId = req.user._id;

    // Step 1: Get all service IDs owned by vendor
    const services = await Service.find({ vendorId }, "_id").lean();
    const serviceIds = services.map((s) => s._id);

    // Step 2: Fetch bookings only for those services
    const bookings = await Booking.find({ service: { $in: serviceIds } })
      .populate({
        path: "service",
        select: "title type location basePrice priceUnit shortDescription",
        options: { lean: true },
      })
      .populate({
        path: "user",
        select: "username email",
        options: { lean: true },
      })
      .populate({
        path: "package",
        select: "name price",
        options: { lean: true },
      })
      .sort({ createdAt: -1 })
      .lean();

    // Include feedback in the response
    const response = bookings.map((b) => ({
      _id: b._id,
      createdAt: b.createdAt,
      eventDate: b.eventDate,
      totalAmount: b.totalAmount,
      advanceAmount: b.advanceAmount,
      paymentStatus: b.paymentStatus,
      user: b.user || {},
      service: b.service || {},
      package: b.package || {},
      feedback: b.feedback || null, // include feedback object if present
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching vendor bookings:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
