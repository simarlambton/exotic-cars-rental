const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    rentalPrice: { type: Number, required: true }, // ✅ Ensure it's a number
    availability: { type: Boolean, default: true },
    images: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("Car", CarSchema);
