const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
dotenv.config();
const initiate = require("./routes/payment");
const serviceRoutes = require("./routes/serviceRoutes");
const { verifyUser } = require("./middlewares/authMiddleware");
const { verifyVendor } = require("./middlewares/authMiddleware");

const bookingRoutes = require("./routes/bookingRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const app = express();

// Configure CORS properly
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json({ limit: "10mb" }));

// Use the routes
app.use("/api/auth", userRoutes);
// console.log("User routes mounted at /api/auth");

app.use("/api", serviceRoutes);

app.post("/payment/initiate", verifyUser, initiate);

app.use("/booking", verifyUser, bookingRoutes);

app.use("/vendor", verifyVendor, vendorRoutes);

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
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
