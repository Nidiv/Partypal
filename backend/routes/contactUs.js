const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/submit", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Save feedback
    const newFeedback = new Feedback({ name, email, subject, message });
    await newFeedback.save();

    // Email to admin
    await transporter.sendMail({
      from: `"PartyPal Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Feedback: ${subject}`,
      html: `
        <h2>Hey admin, Got New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br>")}</p>
        <hr />
        <p style="font-size: 0.85em; color: gray;">Sent from PartyPal contact form</p>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: `"PartyPal Customer Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting PartyPal!",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out to us! We’ve received your message and will get back to you soon.</p>
        <p><strong>Your Message:</strong></p>
        <blockquote>${message.replace(/\n/g, "<br>")}</blockquote>
        <br />
        <p>Cheers,</p>
        <p>The PartyPal Team</p>
      `,
    });

    res.status(200).json({ message: "Feedback received and emails sent!" });
  } catch (err) {
    console.error("Feedback/email error:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
