const express = require("express");
const { getBookingById, createBooking, getMyBookings, getAllBookings, cancelBooking } = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", protect, getBookingById);


// Create booking
router.post("/", protect, createBooking);

// User's own bookings
router.get("/my", protect, getMyBookings);

// Admin only: Get all bookings
router.get("/all", protect, admin, getAllBookings);

// Cancel booking
router.delete("/:id", protect, cancelBooking);

module.exports = router;
