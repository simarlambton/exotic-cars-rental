const express = require("express");
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

module.exports = router;
