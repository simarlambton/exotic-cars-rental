const express = require("express");
const {
  getAllCars,
  getCarById,
  addCar,
  deleteCar,
  updateCar, 
  uploadSingle,
} = require("../controllers/carController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", protect, admin, uploadSingle, addCar);
router.put("/:id", protect, admin, uploadSingle, updateCar); // ✅ PUT route
router.delete("/:id", protect, admin, deleteCar);

module.exports = router;
