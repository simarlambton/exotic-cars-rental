import React, { useState } from "react";

const Booking = ({ carId }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleBooking = async () => {
        const response = await fetch("http://localhost:3030/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ car: carId, startDate, endDate }),
        });

        if (response.ok) {
            alert("Booking Successful!");
        } else {
            alert("Booking Failed!");
        }
    };

    return (
        <div>
            <h1>Book Your Car</h1>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button onClick={handleBooking}>Confirm Booking</button>
        </div>
    );
};

export default Booking;
