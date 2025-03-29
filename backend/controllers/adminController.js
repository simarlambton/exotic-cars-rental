const User = require("../models/User");
const Booking = require("../models/Booking");

const Car = require("../models/Car"); 

// Admin Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalCars = await Car.countDocuments(); 

    res.status(200).json({
      totalUsers,
      totalBookings,
      totalCars, 
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch dashboard stats",
      details: error.message,
    });
  }
};

//  Get All Users (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users", details: error.message });
  }
};

//  Get All Bookings (Admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId", "name email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings", details: error.message });
  }
};
