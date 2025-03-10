const express = require("express");
const cors = require("cors"); // ✅ Import CORS
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const carRoutes = require("./routes/car");

dotenv.config();
const app = express();

// Middleware
app.use(cors()); // ✅ Allow frontend access
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/cars", carRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
