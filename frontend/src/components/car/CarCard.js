import React from "react";

const CarCard = ({ car }) => {
    return (
        <div className="car-card">
            <h3>{car.name}</h3>
            <p>Brand: {car.brand}</p>
            <p>Price: ${car.rentalPrice} per day</p>
            <button onClick={() => window.location.href = `/booking/${car._id}`}>
                Book Now
            </button>
        </div>
    );
};

export default CarCard;
