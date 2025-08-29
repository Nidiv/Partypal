const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
dotenv.config();
const initiate = require("./routes/payment");
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { verifyUser } = require("./middlewares/authMiddleware");
const { verifyVendor } = require("./middlewares/authMiddleware");
const chatRoutes = require("./routes/chatRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactUs");
const vendorRoutes = require("./routes/vendorRoutes");
const app = express();

// Configure CORS for both development and production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://partypal-git-master-nidiv-s-projects.vercel.app",
      "https://partypal-f3q7s0bbv-nidiv-s-projects.vercel.app",
      "https://partypal-nidiv-s-projects.vercel.app", // This might be your main domain
      // Add any other Vercel preview URLs if needed
    ];

    // In development, be more permissive
    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  optionsSuccessStatus: 200,
};

// Alternative simpler approach for testing (less secure but will work):
// const corsOptions = {
//   origin: true, // This allows all origins - use only for testing
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// CORS first – before any routes
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json({ limit: "10mb" }));

// Add a test route to verify server is working
app.get("/api/test", (req, res) => {
  res.json({
    message: "Server is working!",
    timestamp: new Date().toISOString(),
  });
});

//Chat Feature
app.use("/api/chat", chatRoutes);

app.use("/api/contact", contactRoutes);
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", adminRoutes);
// Use the routes
app.use("/api/auth", userRoutes);

app.use("/api", serviceRoutes);

app.post("/payment/initiate", verifyUser, initiate);

app.use("/booking", verifyUser, bookingRoutes);

app.use("/vendor", verifyVendor, vendorRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Debug logs - using a more reliable method
function printRoutes(router) {
  const routes = [];
  router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes registered directly
      routes.push(
        `${Object.keys(middleware.route.methods)} ${middleware.route.path}`
      );
    } else if (middleware.name === "router") {
      // Router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const path = handler.route.path;
          routes.push(`${Object.keys(handler.route.methods)} /api/auth${path}`);
        }
      });
    }
  });
  console.log("Server routes:", routes);
}

// Print routes after they're set up
printRoutes(app._router);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
