const express = require("express");
const Service = require("../models/service");
// Import the Service model
const router = express.Router();

// ✅ GET all services (New Route)
router.get("/services", async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  console.log(req.user._id);
  console.log(_id);
  try {
    const services = await Service.find({ vendorId: _id }); // Fetch all services from the database
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Add a new service
router.post("/services", async (req, res) => {
  const { _id } = req.user;
  try {
    // Extract service data from the request body
    const {
      title,
      type,
      shortDescription,
      location,
      detailedDescription,
      basePrice,
      priceUnit,
      advancePayment,
      cancelationPolicy,
      customCancelationPolicy,
      cuisines,
      dietaryOptions,
      minGuests,
      maxGuests,
      additionalServices,
      packages,
      photos,
      videoLink,
      menuPdf,
      vendorId = _id,
    } = req.body;

    // Validate required fields
    // if (!title || !type || !shortDescription || !location || !vendorId) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }

    // Create a new service instance
    const newService = new Service({
      title,
      type,
      shortDescription,
      location,
      detailedDescription,
      basePrice,
      priceUnit,
      advancePayment,
      cancelationPolicy,
      customCancelationPolicy,
      cuisines,
      dietaryOptions,
      minGuests,
      maxGuests,
      additionalServices,
      packages,
      photos,
      videoLink,
      menuPdf,
      vendorId,
    });

    // Save the service to the database
    const savedService = await newService.save();

    // Return the saved service as a response
    res.status(201).json({
      message: "Service created successfully",
      service: savedService,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
