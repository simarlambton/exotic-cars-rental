const express = require("express");

const sgMail = require("@sendgrid/mail");

const {
    register,
    login,
    logoutUser,
    getProfile,
    updateProfile,
    getAllUsers,
    forgotPassword,
    resetPassword,
    checkPasswordHash // Debug Route
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// User Authentication Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);

// Debug Route to Check Stored Hash
router.post("/debug-password", checkPasswordHash);

// Password Reset Routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// User Profile Routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Admin Routes
router.get("/all-users", protect, admin, getAllUsers);


sgMail.setApiKey("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");

// Contact Form Route
router.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required!" });
    }
  
    const msg = {
      to: "simarpreetsandhu0172@gmail.com", // Replace with your email address
      from: email, // Sender's email address
      subject: "New Message from Exotic Cars Rental Contact Form",
      text: `
        You have received a new message from the contact form.
  
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <p>You have received a new message from the contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };
  
    try {
      // Send email using SendGrid
      await sgMail.send(msg);
      return res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email!", error });
    }
  });


module.exports = router;
