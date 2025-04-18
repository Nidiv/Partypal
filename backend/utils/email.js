const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingConfirmation = async (toEmail, userName, booking) => {
  const mailOptions = {
    from: '"PartyPal 🎉" <no-reply@partypal.com>',
    to: toEmail,
    subject: "🎉 Booking Confirmed – Thank You for Choosing PartyPal!",
    html: `
      <h2>Hi ${userName},</h2>
      <p>Thank you for booking <strong>${booking.serviceTitle}</strong> with PartyPal!</p>
      <p>Your event is on <strong>${booking.eventDate}</strong>.</p>
      <br/>
      <p>Cheers,<br/>The PartyPal Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// ✅ Correct export as object
module.exports = { sendBookingConfirmation };
