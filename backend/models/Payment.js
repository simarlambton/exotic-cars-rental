const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  amount: Number,
  currency: String,
  transactionId: String,
  paymentStatus: { type: String, enum: ["Pending", "Success", "Failed"], default: "Success" },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
