const Booking = require("../models/Booking");

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate, totalPrice } = req.body;

    const booking = await Booking.create({
      userId: req.user.id,
      carId,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

// Get bookings of current user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate("carId", "name model pricePerDay");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// Admin: Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId", "name email").populate("carId", "name model");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all bookings", error: error.message });
  }
};

// Cancel (Delete) a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure only the user who booked it or admin can cancel
    if (booking.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking canceled" });
  } catch (error) {
    res.status(500).json({ message: "Error canceling booking", error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("carId", "name");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ ...booking.toObject(), car: booking.carId });
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
};

