import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import "../../styles/CarListing.css";

const CarListing = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  return (
    <div>
      <h2>Available Cars</h2>
      <div className="car-list">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarListing;
