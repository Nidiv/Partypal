// ServiceRoutes.js
const express = require("express");
const Service = require("../models/service");
const { verifyVendor } = require("../middlewares/authMiddleware");
const router = express.Router();

// Public routes (no authentication needed)
router.get("/all-services", async (req, res) => {
  try {
    const services = await Service.find().populate("vendorId", "name email"); // Added populate
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching all services:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Protected routes (require vendor authentication)
router.use(verifyVendor); // All routes after this will require auth

router.get("/services", async (req, res) => {
  const { _id } = req.user;
  try {
    const services = await Service.find({ vendorId: _id });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ... rest of your protected routes ...

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

// Add this to your serviceRoutes.js (public route)
router.get("/service-packages/:serviceId", async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId).select(
      "packages basePrice advancePayment"
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      packages: service.packages,
      basePrice: service.basePrice,
      advancePayment: service.advancePayment,
    });
  } catch (error) {
    console.error("Error fetching service packages:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
