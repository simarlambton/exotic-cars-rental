const express = require("express");
const multer = require("multer");
const router = express.Router();
const Car = require("../models/Car");
const { protect, admin } = require("../middleware/authMiddleware");

// ✅ Get All Cars (Public)
router.get("/", async (req, res) => {
    try {
      const cars = await Car.find();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });

  // ✅ Configure Multer for Image Upload
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });
  
  // ✅ Ensure only one file is uploaded
  router.post("/addCar", async (req, res) => {
    try {
        const { name, brand, description, rentalPrice, availability, images } = req.body;

        // ✅ Ensure rentalPrice is a valid number
        if (!rentalPrice || isNaN(rentalPrice)) {
            return res.status(400).json({ error: "Invalid rental price" });
        }

        const newCar = new Car({ name, brand, description, rentalPrice: Number(rentalPrice), availability, images });
        await newCar.save();

        res.status(201).json({ message: "Car added successfully!", car: newCar });
    } catch (error) {
        res.status(500).json({ error: "Error adding car" });
    }
});

  
  
    

  // ✅ Delete a Car (Admin Only)
router.delete("/delete/:id", protect, admin, async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
  
      await car.deleteOne();
      res.json({ message: "Car deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting car:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  });
  
  
  
module.exports = router;
