const express = require("express");
const {
  getBookingById,
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  getCheckAvailability
} = require("../controllers/bookingController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ ORDER MATTERS — /my BEFORE /:id
router.get("/my", protect, getMyBookings);
router.get("/checkAvailability", protect, getCheckAvailability);
router.get("/all", protect, admin, getAllBookings);
router.get("/:id", protect, getBookingById);

router.post("/", protect, createBooking);
router.delete("/:id", protect, cancelBooking);

module.exports = router;
