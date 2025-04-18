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
    subject: "🎉 Booking Confirmation – Thank You for Choosing PartyPal!",
    html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #6a1b9a;">Hi ${userName},</h2>
  
          <p>
            Thank you for booking our service <strong>${
              booking.serviceTitle
            }</strong> from <strong>PartyPal</strong>!
          </p>
  
          <p>
            <strong>📅 Event Date:</strong> ${booking.eventDate}<br/>
            <strong>💰 Total Amount:</strong> Rs. ${booking.totalAmount.toLocaleString()}<br/>
            <strong>💳 Payment Type:</strong> ${
              booking.paymentOption === "full"
                ? "Full Payment"
                : "Partial Payment"
            }
          </p>
  
          <p>
            If you have any questions or special requests regarding your booking, feel free to reach out to us. We’re here to make your event a success!
          </p>
  
          <p>
            <strong>📞 Phone:</strong> <a href="tel:+9779861119876">9861119876</a>
          </p>
  
          <p>
            <a href="mailto:nidiv04@gmail.com" style="display: inline-block; padding: 10px 16px; background-color: #6a1b9a; color: #fff; border-radius: 6px; text-decoration: none;">
              📩 Contact Us
            </a>
          </p>
  
          <br/>
          <p>Cheers,<br/>The PartyPal Team 🎉</p>
        </div>
      `,
  };

  return transporter.sendMail(mailOptions);
};

// ✅ Correct export as object
module.exports = { sendBookingConfirmation };
