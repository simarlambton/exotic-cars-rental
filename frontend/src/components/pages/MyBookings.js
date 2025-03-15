import React, { useEffect, useState } from "react";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/api/bookings")
            .then((res) => res.json())
            .then((data) => setBookings(data))
            .catch((error) => console.error("Error fetching bookings:", error));
    }, []);

    return (
        <div>
            <h1>My Bookings</h1>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id}>
                        Car: {booking.car.name}, Status: {booking.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyBookings;
