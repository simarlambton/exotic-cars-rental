const express = require("express");
const cors = require("cors"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const carRoutes = require("./routes/car");
const authRoutes = require("./routes/auth");

// 🔹 Previous Code
dotenv.config();
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);

// 🔹 New Changes: Added Booking Route
const bookingRoutes = require("./routes/booking");
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
