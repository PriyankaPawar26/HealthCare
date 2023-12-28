const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
    port: 587,
  auth: {
    user: 'alda.renner78@ethereal.email',
        pass: 'GBtQTZBBuDeyTgr8zs'
  },
});

// Endpoint to handle form submission
router.post('/', async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    // Send confirmation email to the user
    await transporter.sendMail({
      from: 'priyankapawar25059@gmail.com',
      to: email,
      subject: 'Thank you for contacting us!',
      text: 'We have received your message and will get back to you soon.',
    });

    // Send inquiry email to the admin
    await transporter.sendMail({
      from: email,
      to: 'priyankapawar25059@gmail.com', // Admin's email
      subject: `New Inquiry: ${subject}`,
      text: `From: ${email}\n\nMessage: ${message}`,
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send emails' });
  }
});

module.exports = router;
