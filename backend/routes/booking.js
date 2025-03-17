const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Ensure correct import

// ✅ Ensure middleware is passed as a function
router.post("/book", authMiddleware, async (req, res) => {
    try {
        const { carId, startDate, endDate } = req.body;
        const userId = req.user.userId; 

        // Check if the car exists
        const car = await Car.findById(carId);
        if (!car) return res.status(404).json({ error: "Car not found" });

        // Create booking
        const newBooking = new Booking({ user: userId, car: carId, startDate, endDate });
        await newBooking.save();

        res.status(201).json({ message: "Car booked successfully!", booking: newBooking });
    } catch (error) {
        console.error("❌ Error in /book:", error);
        res.status(500).json({ error: "Error booking car" });
    }
});

module.exports = router;
