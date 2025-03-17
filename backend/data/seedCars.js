const mongoose = require("mongoose");
const Car = require("../models/Car");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const sampleCars = [
    {
        name: "Lamborghini Huracán",
        brand: "Lamborghini",
        description: "A fast and stylish sports car with a V10 engine.",
        rentalPrice: 1200,
        availability: true,
        images: ["https://source.unsplash.com/200x150/?lamborghini"],
    },
    {
        name: "Ferrari 488 Spider",
        brand: "Ferrari",
        description: "A luxurious convertible with a powerful V8 engine.",
        rentalPrice: 1500,
        availability: true,
        images: ["https://source.unsplash.com/200x150/?ferrari"],
    },
    {
        name: "Porsche 911",
        brand: "Porsche",
        description: "A legendary sports car with timeless elegance.",
        rentalPrice: 900,
        availability: true,
        images: ["https://source.unsplash.com/200x150/?porsche"],
    },
    {
        name: "BMW M4",
        brand: "BMW",
        description: "A stylish performance coupe with a turbocharged engine.",
        rentalPrice: 600,
        availability: true,
        images: ["https://source.unsplash.com/200x150/?bmw"],
    }
];

const seedDatabase = async () => {
    try {
        await Car.deleteMany(); // Clears existing data
        await Car.insertMany(sampleCars);
        console.log("✅ Sample car data added successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error seeding database:", error);
    }
};

seedDatabase();
