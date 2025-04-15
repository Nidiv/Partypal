const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// POST /api/bookings/confirm
router.post("/confirm", async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: "bookingId is required" });
    }

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update fields
    booking.paymentStatus = "completed";

    // Save the booking
    await booking.save();

    return res.status(200).json({ message: "Booking confirmed", booking });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /booking/my-completed
router.get("/my-completed", async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("my-completed");
    const bookings = await Booking.find({
      user: userId,
      paymentStatus: "completed",
    })
      .populate({
        path: "service",
        select: "-vendorId", // ✅ include everything EXCEPT vendorId
      })
      .populate({
        path: "package",
        select: "name price description", // optionally limit package fields
      });
    console.log(bookings);

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching completed bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /booking/feedback/:bookingId
router.post("/feedback/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rating, text } = req.body;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      paymentStatus: "completed",
    });

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or not eligible for feedback" });
    }

    if (booking.feedback && booking.feedback.rating) {
      return res.status(400).json({ message: "Feedback already submitted" });
    }

    booking.feedback = {
      rating,
      text,
      submittedAt: new Date(),
    };

    await booking.save();

    res.status(200).json({
      message: "Feedback submitted successfully",
      feedback: booking.feedback,
    });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
