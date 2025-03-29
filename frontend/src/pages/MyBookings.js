import React, { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../api/bookingApi";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res);
    } catch {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(id);
      toast.success("Booking cancelled");
      fetchBookings();
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  return (
    <Container className="my-5 py-5">
      <h2 className="text-center my-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center">
          <p>You have no bookings yet.</p>
        </div>
      ) : (
        <Row>
          {bookings.map((b) => (
            <Col md={4} key={b._id}>
              <Card className="booking-card mb-3">
                <Card.Body>
                  <Card.Title>{b.carId?.name || "Car"}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {b.status === "Confirmed" ? (
                      <span className="badge badge-success">Confirmed</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </Card.Subtitle>
                  <p>
                    <strong>From:</strong> {new Date(b.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>To:</strong> {new Date(b.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ${b.totalPrice}
                  </p>
                  <p>
                    <strong>Status:</strong> {b.status}
                  </p>
                  {b.status === "Confirmed" && (
                    <Button
                      variant="danger"
                      onClick={() => handleCancel(b._id)}
                      className="w-100"
                    >
                      Cancel Booking
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyBookings;
