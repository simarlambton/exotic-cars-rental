// server.js
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const contactRoutes = require("./routes/contactRoutes");

// import "./utils/redisTest.js";

const redisClient = require("./utils/redisTest");

connectDB();

const app = express();

// ✅ Proper CORS for cookie/token auth
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

app.use("/api/contact", contactRoutes);  // Add this route

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🤡 Server running on port ${PORT}`));
