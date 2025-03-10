const express = require("express");
const Car = require("../models/Car");

const router = express.Router();

// Fetch all cars
router.get("/", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Search cars by name or brand
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        const cars = await Car.find({
            $or: [{ name: new RegExp(query, "i") }, { brand: new RegExp(query, "i") }]
        });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
