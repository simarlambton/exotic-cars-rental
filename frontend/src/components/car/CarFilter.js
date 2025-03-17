import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import CarFilter from "./CarFilter";

const CarListing = () => {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({});
    // Fetch cars from API with applied filters
    const fetchCars = async () => {
        try {
            let query = new URLSearchParams(filters).toString();
            const response = await fetch(`http://localhost:3030/api/cars?${query}`);
            if (!response.ok) {
                throw new Error("Failed to fetch cars");
            }
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    // Fetch cars whenever filters change
    useEffect(() => {
        fetchCars();
    }, [filters]);

    return (
        <div>
            <h1>Available Cars</h1>
            <CarFilter applyFilters={setFilters} /> {/* 🔹 Display Filter Component */}
            <div className="car-list">
                {cars.length > 0 ? (
                    cars.map((car) => <CarCard key={car._id} car={car} />)
                ) : (
                    <p>No cars found</p>
                )}
            </div>
        </div>
    );
};

export default CarListing;
