// backend/routes/carRoutes.js
const express = require("express");
const {
  getAllCars,
  getCarById,
  addCar,
  deleteCar,
  uploadSingle
} = require("../controllers/carController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);

// ✅ Now uses single upload middleware
router.post("/", protect, admin, uploadSingle, addCar);
router.delete("/:id", protect, admin, deleteCar);

module.exports = router;
