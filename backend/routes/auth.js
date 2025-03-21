const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");

// -------------------------------
// User & Admin Login Route
// -------------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// -------------------------------
// Register User Route (Signup)
// -------------------------------
router.post("/signup", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false // Default to user role if not provided
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// -------------------------------
// Forgot Password Route
// -------------------------------
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (!process.env.JWT_SECRET)
      return res.status(500).json({ error: "JWT_SECRET is missing in .env" });

    // Generate JWT for password reset (expires in 1 hour)
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          passwordResetToken: resetToken,
          passwordResetExpires: Date.now() + 3600000, // 1 hour from now
        },
      }
    );

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const emailText = `Click the link to reset your password: ${resetUrl}`;
    const emailSent = await sendEmail(email, "Password Reset", emailText);

    if (!emailSent.success) {
      return res.status(500).json({ error: "Error sending email. Check SendGrid API key." });
    }

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Error in Forgot Password API:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// -------------------------------
// Reset Password Route
// -------------------------------
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is missing in .env" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const user = await User.findOne({
      _id: decoded.userId,
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password: await bcrypt.hash(password, 10),
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
        },
      },
      { runValidators: false }
    );

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error in Reset Password API:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
