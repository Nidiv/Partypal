const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
  },
  addOns: [
    {
      type: String,
    },
  ],
  specialRequests: {
    type: String,
  },
  paymentOption: {
    type: String,
    enum: ["full", "partial"],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  advanceAmount: {
    type: Number,
    required: true,
  },
  isFullPayment: {
    type: Boolean,
    default: false,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "partial"],
    default: "pending",
  },
  paymentId: {
    type: String,
  },
  paymentUrl: {
    type: String,
  },
  paymentDate: {
    type: Date,
  },
  remainingAmount: {
    type: Number,
  },
  remainingPaymentDue: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventDate: {
    type: Date,
  },

  // ✅ Feedback Section
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
    },
    submittedAt: {
      type: Date,
    },
  },
});

// Update timestamps
bookingSchema.pre("save", function (next) {
  if (this.isModified("paymentStatus") && this.paymentStatus === "completed") {
    this.paymentDate = new Date();
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
