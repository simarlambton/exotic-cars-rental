const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
