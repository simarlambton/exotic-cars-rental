const cloudinary = require("../utils/cloudinary");
const redisClient = require("../utils/redisClient");
const multer = require("multer");
const Car = require("../models/Car");



// Multer: single image upload middleware
const storage = multer.memoryStorage();
const upload = multer({ storage });
exports.uploadSingle = upload.single("image");

// GET all cars (with Redis cache)
exports.getAllCars = async (req, res) => {
  try {
    const cacheKey = "allCars";

    redisClient.get(cacheKey, async (err, data) => {
      if (err) throw err;

      if (data) {
        console.log("🚀 Redis cache hit");
        return res.json(JSON.parse(data));
      } else {
        console.log("🧠 Redis cache miss");
        const cars = await Car.find();
        redisClient.setex(cacheKey, 3600, JSON.stringify(cars));
        return res.json(cars);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

// GET car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch car" });
  }
};

// POST add a car
exports.addCar = async (req, res) => {
  try {
    const { name, brand, model, year, color, pricePerDay } = req.body;

    let imageUrl = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            return resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult;
    } else {
      return res.status(400).json({ error: "Image is required" });
    }

    const newCar = new Car({
      name,
      brand,
      model,
      year,
      color,
      pricePerDay,
      image: imageUrl,
    });

    await newCar.save();
    redisClient.del("allCars");

    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("❌ Add Car Error:", error);
    res.status(500).json({ error: "Failed to add car", details: error.message });
  }
};

// DELETE car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });

    redisClient.del("allCars");
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete car" });
  }
};

//  PUT update existing car
// Add this inside carController.js
exports.updateCar = async (req, res) => {
  try {
    const { name, brand, model, year, color, pricePerDay } = req.body;
    const carId = req.params.id;

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ error: "Car not found" });

    let imageUrl = car.image; // default to existing image

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            return resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult;
    }

    // Update car fields
    car.name = name;
    car.brand = brand;
    car.model = model;
    car.year = year;
    car.color = color;
    car.pricePerDay = pricePerDay;
    car.image = imageUrl;

    await car.save();

    // ✅ Clear cache
    redisClient.del("allCars");

    res.json({ message: "Car updated successfully", car });
  } catch (error) {
    console.error("❌ Update Car Error:", error);
    res.status(500).json({ error: "Failed to update car", details: error.message });
  }
};



