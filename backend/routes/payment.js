const Service = require("../models/service");
const Booking = require("../models/booking"); // You'll need to create this model
const express = require("express");
const request = require("request");
const { sendBookingConfirmation } = require("../utils/email"); //import this

async function initiate(req, res) {
  try {
    console.log("user:");
    console.log(req.body.user);

    const {
      serviceId,
      packageId,
      guestCount,
      addOns,
      specialRequests,
      paymentOption,
      amount,
      isFullPayment,
      eventDate,
    } = req.body;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Calculate the actual amount in paisa (Khalti requires amount in paisa)
    const amountInPaisa = amount * 100;

    console.log("user:");
    console.log(req.body.user);
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
      eventDate: eventDate,
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
        return_url: "http://localhost:3000/verifypayment",
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

    // Wrap `request` in a Promise so we can await it
    const paymentResponse = await new Promise((resolve, reject) => {
      request(options, (error, response) => {
        if (error) {
          return reject(error);
        }
        try {
          const body = JSON.parse(response.body);
          resolve(body);
        } catch (err) {
          reject(err);
        }
      });
    });

    // Update booking
    await Booking.findByIdAndUpdate(savedBooking._id, {
      paymentId: paymentResponse.pidx,
      paymentUrl: paymentResponse.payment_url,
    });

    // Send email
    await sendBookingConfirmation(
      req.user?.email || "nidiv04@gmail.com",
      req.user?.username || "static",
      {
        serviceTitle: service.title,
        eventDate,
        totalAmount: amount,
        paymentOption,
      }
    );

    // Send response back
    res.status(200).json({
      ...paymentResponse,
      bookingId: savedBooking._id,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = initiate;
