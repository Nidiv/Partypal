const express = require("express");
const router = express.Router();
const Message = require("../models/message"); // must resolve to actual model file
console.log("Imported Message model:", Message);
// GET conversation between user and vendor
router.get("/conversation", async (req, res) => {
  const { userId, vendorId } = req.query;
  // console.log("🔎 Raw req.query:", req.query);

  console.log("Received conversation request:", userId, vendorId);

  if (!userId || !vendorId) {
    return res.status(400).json({ error: "Missing userId or vendorId" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: vendorId },
        { senderId: vendorId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("Failed to fetch conversation:", err);
    res.status(500).json({ error: "Server error fetching messages" });
  }
});

// POST a new message
router.post("/send", async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json(message);
  } catch (err) {
    console.error("Failed to send message:", err);
    res.status(500).json({ error: "Server error sending message" });
  }
});

module.exports = router;
