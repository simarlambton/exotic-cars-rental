const express = require("express");
const Car = require("../models/Car");

const router = express.Router();

//  Fetch all cars
router.get("/", async (req, res) => {
    try {
        const cars = await Car.find(); 
        res.json(cars);
    } catch (err) {
        console.error("Error fetching cars:", err);
        res.status(500).json({ message: "Error fetching cars" });
    }
});

//  Search cars by name or brand
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        const cars = await Car.find({
            $or: [{ name: new RegExp(query, "i") }, { brand: new RegExp(query, "i") }]
        });
        res.json(cars);
    } catch (err) {
        console.error("Error searching cars:", err);
        res.status(500).json({ message: "Error searching cars" });
    }
});

module.exports = router;
