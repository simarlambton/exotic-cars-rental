const express = require("express");
const { getDashboardStats, getAllUsers, getAllBookings } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//  Admin Dashboard
router.get("/dashboard", protect, admin, getDashboardStats);
router.get("/users", protect, admin, getAllUsers);
router.get("/bookings", protect, admin, getAllBookings);

module.exports = router;
