import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{booking.car?.brand} {booking.car?.model}</h5>
        <p><strong>From:</strong> {booking.startDate}</p>
        <p><strong>To:</strong> {booking.endDate}</p>
        <p><strong>Total:</strong> ${booking.totalPrice}</p>
        <p><strong>Status:</strong> {booking.status}</p>
      </div>
    </div>
  );
};

export default BookingCard;
