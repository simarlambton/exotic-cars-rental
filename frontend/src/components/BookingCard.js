import { Card, Button } from "react-bootstrap";

const BookingCard = ({ booking, cancelBooking }) => {
  return (
    <Card className="shadow-lg mb-4">
      <Card.Body>
        <Card.Title>Car: {booking.carId.brand} - {booking.carId.model}</Card.Title>
        <Card.Text>Start Date: {new Date(booking.startDate).toLocaleDateString()}</Card.Text>
        <Card.Text>End Date: {new Date(booking.endDate).toLocaleDateString()}</Card.Text>
        <Card.Text>Total Price: ${booking.totalPrice}</Card.Text>
        <Button variant="danger" onClick={() => cancelBooking(booking._id)}>Cancel Booking</Button>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
