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
      status: "Confirmed", // Optional: could be omitted since it's default
    });

    res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

// Get bookings of current user
exports.getMyBookings = async (req, res) => {
  try {
    // Log user for debug
    console.log("🔐 req.user:", req.user);

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user in request" });
    }

    const bookings = await Booking.find({ userId: req.user.id }).populate(
      "carId",
      "name model pricePerDay"
    );

    res.json(bookings);
  } catch (error) {
    console.error("❌ Error in getMyBookings:", error);
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

// Admin: Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("carId", "name model");
    res.json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all bookings", error: error.message });
  }
};

// Cancel (update status) instead of deleting
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure only the user who booked it or admin can cancel
    if (booking.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this booking" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error cancelling booking", error: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "carId",
      "name"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ ...booking.toObject(), car: booking.carId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: error.message });
  }
};

exports.getCheckAvailability = async (req, res) => {
  const { carId, startDate, endDate } = req.query;

  if (!carId || !startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Car ID, start date, and end date are required" });
  }

  try {
    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if there are any bookings that overlap with the requested dates
    const existingBooking = await Booking.findOne({
      carId,
      $or: [
        // Overlapping bookings (start date or end date falls within requested range)
        { startDate: { $lt: end }, endDate: { $gt: start } },
        // The car is booked before and after the requested range
        { startDate: { $gt: start }, endDate: { $lt: end } },
      ],
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "Car is already booked for the selected dates" });
    }

    return res
      .status(200)
      .json({ message: "Car is available for the selected dates" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking availability" });
  }
};
