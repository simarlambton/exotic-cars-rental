import React, { useEffect, useState } from "react";
import { getAllBookings } from "../api/bookingApi";
import { useAuth } from "../context/AuthContext";
import { Container, Table, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) fetchBookings();
  }, [user]);

  if (!user?.isAdmin) return <p className="text-center mt-5">Access Denied</p>;
  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="my-5">
      <h2>Manage Bookings</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>User</th>
            <th>Car</th>
            <th>From</th>
            <th>To</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.userId?.name} <br /><small>{b.userId?.email}</small></td>
              <td>{b.carId?.name}</td>
              <td>{new Date(b.startDate).toLocaleDateString()}</td>
              <td>{new Date(b.endDate).toLocaleDateString()}</td>
              <td>${b.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageBookings;
