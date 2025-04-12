const Service = require("../models/service");
const Booking = require("../models/booking"); // You'll need to create this model
const express = require("express");
const request = require("request");

async function initiate(req, res) {
  try {
    const {
      serviceId,
      packageId,
      guestCount,
      addOns,
      specialRequests,
      paymentOption,
      amount,
      isFullPayment,
    } = req.body;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Calculate the actual amount in paisa (Khalti requires amount in paisa)
    const amountInPaisa = amount * 100;

    // Create a booking record first
    const newBooking = new Booking({
      service: serviceId,
      package: packageId,
      guestCount,
      addOns,
      specialRequests,
      paymentOption,
      totalAmount: isFullPayment ? amount : service.basePrice,
      advanceAmount: amount,
      isFullPayment,
      paymentStatus: "pending",
      user: req.user?._id, // If you have user authentication
    });

    const savedBooking = await newBooking.save();

    var options = {
      method: "POST",
      url: "https://dev.khalti.com/api/v2/epayment/initiate/",
      headers: {
        Authorization: "key 00f636e12e3144b8b517786d469a0b2a",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url: "http://localhost:3000/services",
        website_url: "http://localhost:3000",
        amount: amountInPaisa,
        purchase_order_id: savedBooking._id, // Use booking ID as reference
        purchase_order_name: `Booking for ${service.title}`,
        customer_info: {
          name: req.user?.username || "Nidiv Kayastha",
          email: req.user?.email || "Nidiv@gmail.com",
        },
      }),
    };

    request(options, function (error, response) {
      if (error) {
        console.error("Payment initiation error:", error);
        return res
          .status(500)
          .json({ message: "Payment initiation failed", error: error.message });
      }

      const paymentResponse = JSON.parse(response.body);
      console.log("Payment response:", paymentResponse);

      // Update booking with payment ID
      Booking.findByIdAndUpdate(savedBooking._id, {
        paymentId: paymentResponse.pidx,
        paymentUrl: paymentResponse.payment_url,
      }).exec();

      res.status(200).json({
        ...paymentResponse,
        bookingId: savedBooking._id,
      });
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = initiate;
