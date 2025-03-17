import React, { useState } from "react";
import axios from "axios";
import carsData from "../../data/carsData";

const CarListing = () => {
  const [bookedCar, setBookedCar] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({ startDate: "", endDate: "" });

  const handleBooking = async (carId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3030/api/bookings/book",
        { carId, startDate: bookingInfo.startDate, endDate: bookingInfo.endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookedCar(response.data.booking);
      alert("✅ Booking successful!");
    } catch (error) {
      console.error("❌ Booking error:", error);
      alert("❌ Error booking car");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Browse Cars</h2>

      <div className="row">
        {carsData.map((car) => (
          <div className="col-md-4 mb-4" key={car.id}>
            <div className="card">
              <img src={car.images[0]} className="card-img-top" alt={car.name} />
              <div className="card-body">
                <h5 className="card-title">{car.name}</h5>
                <p className="card-text">{car.brand}</p>
                <p className="card-text">${car.rentalPrice} per day</p>
                
                <input
                  type="date"
                  className="form-control mb-2"
                  onChange={(e) => setBookingInfo({ ...bookingInfo, startDate: e.target.value })}
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  onChange={(e) => setBookingInfo({ ...bookingInfo, endDate: e.target.value })}
                />
                
                <button className="btn btn-primary" onClick={() => handleBooking(car.id)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarListing;
