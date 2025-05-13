const Service = require("../models/service");
const Booking = require("../models/booking");
const User = require("../models/user"); // ✅ Make sure this is correct path
const express = require("express");
const request = require("request");
const {
  sendBookingConfirmation,
  sendVendorNotification,
} = require("../utils/email");

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
      eventDate,
    } = req.body;

    // ✅ Populate vendor
    const service = await Service.findById(serviceId).populate("vendorId");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const vendor = service.vendorId;

    const amountInPaisa = amount * 100;

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
      user: req.user?._id,
    });

    const savedBooking = await newBooking.save();

    const options = {
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
        purchase_order_id: savedBooking._id,
        purchase_order_name: `Booking for ${service.title}`,
        customer_info: {
          name: req.user?.username || "Nidiv Kayastha",
          email: req.user?.email || "Nidiv@gmail.com",
        },
      }),
    };

    const paymentResponse = await new Promise((resolve, reject) => {
      request(options, (error, response) => {
        if (error) return reject(error);
        try {
          const body = JSON.parse(response.body);
          resolve(body);
        } catch (err) {
          reject(err);
        }
      });
    });

    await Booking.findByIdAndUpdate(savedBooking._id, {
      paymentId: paymentResponse.pidx,
      paymentUrl: paymentResponse.payment_url,
    });

    // ✅ Send email to user
    await sendBookingConfirmation(
      req.user?.email || "partypal.co@gmail.com",
      req.user?.username || "static",
      {
        serviceTitle: service.title,
        eventDate,
        totalAmount: amount,
        paymentOption,
      }
    );

    // ✅ Send email to vendor
    await sendVendorNotification(vendor.email, vendor.username, {
      serviceTitle: service.title,
      eventDate,
      customerName: req.user?.username || "Anonymous User",
      paymentOption,
      totalAmount: amount,
    });

    // ✅ Respond
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
