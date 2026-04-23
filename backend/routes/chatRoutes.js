const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const { verifyVendor } = require("../middlewares/authMiddleware");

// GET: Retrieve unique users who have chatted with the current vendor
router.get("/messages", verifyVendor, async (req, res) => {
  try {
    const vendorId = req.user.id;

    const messages = await Message.find({
      $or: [{ senderId: vendorId }, { receiverId: vendorId }],
    })
      .populate("senderId", "username _id")
      .populate("receiverId", "username _id")
      .sort({ createdAt: -1 });

    const uniqueUsers = Array.from(
      new Map(
        messages
          .map((msg) => {
            const user =
              msg.senderId._id.toString() === vendorId
                ? msg.receiverId
                : msg.senderId;

            return user && user._id ? [user._id.toString(), user] : null;
          })
          .filter(Boolean)
      ).values()
    );

    res.status(200).json({ users: uniqueUsers });
  } catch (err) {
    console.error("❌ Failed to fetch messaged users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Retrieve full conversation between user and vendor
router.get("/conversation", async (req, res) => {
  const { userId, vendorId } = req.query;

  if (!userId || !vendorId) {
    return res.status(400).json({ error: "Missing userId or vendorId" });
  }

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: vendorId },
        { senderId: vendorId, receiverId: userId },
      ],
    })
      .populate("senderId", "username _id")
      .populate("receiverId", "username _id")
      .sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Failed to fetch conversation:", err);
    res.status(500).json({ error: "Server error fetching messages" });
  }
});

// POST: Send a new message
router.post("/send", async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const message = await Message.create({ senderId, receiverId, content });
    res.status(201).json(message);
  } catch (err) {
    console.error("❌ Failed to send message:", err);
    res.status(500).json({ error: "Server error sending message" });
  }
});

module.exports = router;
