const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    name: String,
    brand: String,
    description: String,
    rentalPrice: Number,
    availability: Boolean,
    images: [String],
}, { timestamps: true });

module.exports = mongoose.model("Car", CarSchema);
