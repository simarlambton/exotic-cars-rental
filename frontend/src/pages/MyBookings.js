import React, { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../api/bookingApi";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getUserBookings();
        setBookings(data);
      } catch (error) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      setBookings(bookings.filter((b) => b._id !== id));
      toast.success("Booking cancelled");
    } catch (error) {
      toast.error("Cancellation failed");
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="my-5">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Car</th>
              <th>Start</th>
              <th>End</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.carId?.name || "N/A"}</td>
                <td>{new Date(b.startDate).toLocaleDateString()}</td>
                <td>{new Date(b.endDate).toLocaleDateString()}</td>
                <td>$ {b.totalPrice}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleCancel(b._id)}>
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyBookings;
