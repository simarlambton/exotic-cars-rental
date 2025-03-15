import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import "../../styles/CarListing.css"; // Import CSS

const CarListing = () => {
    const [cars, setCars] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch cars from API with debugging logs
    useEffect(() => {
        fetch("http://localhost:3030/api/cars")
            .then((res) => res.json())
            .then((data) => setCars(data))
            .catch((error) => console.error("Error fetching cars:", error));
    }, []);
    

    //  Handle search input
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        fetch(`http://localhost:3030/api/cars/search?query=${query}`)
            .then((res) => res.json())
            .then((data) => setCars(data))
            .catch((err) => console.error("Error fetching search results:", err));
    };

    return (
        <div className="car-listing-container">
            <h2 className="page-title">Available Cars</h2>

            {/*  Search Input */}
            <input
                type="text"
                placeholder="Search by brand or name..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-bar"
            />

            {/*  Car Listings */}
            <div className="car-list">
                {cars.length > 0 ? (
                    cars.map((car) => <CarCard key={car._id} car={car} />)
                ) : (
                    <p className="no-results">No cars available</p>
                )}
            </div>
        </div>
    );
};

export default CarListing;
