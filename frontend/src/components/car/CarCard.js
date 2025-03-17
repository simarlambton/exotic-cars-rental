import React from "react";

const CarCard = ({ car }) => {
    return (
        <div className="car-card">
            <img src={car.images[0]} alt={car.name} />
            <h3>{car.brand} {car.name}</h3>
            <p>{car.description}</p>
            <p>Price: ${car.rentalPrice}/day</p>
            <button>Rent Now</button>
        </div>
    );
};
export default CarCard;
