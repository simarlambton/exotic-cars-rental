const express = require("express");
const cors = require("cors"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const carRoutes = require("./routes/car");
const authRoutes = require("./routes/auth");

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
