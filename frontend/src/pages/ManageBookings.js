import React, { useEffect, useState } from "react";
import { getAllBookings, cancelBooking } from "../api/bookingApi";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getAllBookings();
      setBookings(res);
    } catch (error) {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await cancelBooking(id);
      toast.success("Booking canceled");
      fetchData();
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  const exportCSV = () => {
    const headers = ["User", "Car", "From", "To", "Total", "Status"];
    const rows = bookings.map((b) => [
      b.userId?.name || "N/A",
      b.carId?.name || "N/A",
      formatDate(b.startDate),
      formatDate(b.endDate),
      `$${b.totalPrice}`,
      b.status || "Confirmed",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bookings.csv";
    link.click();
  };

  return (
    <Container className="my-5 py-5 ">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="pt-5 fw-bold">Manage Bookings</h2>
        <Button variant="success" onClick={exportCSV}>
          Export to CSV
        </Button>
      </div>

      <Table className="my-5 py-5" striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Car</th>
            <th>From</th>
            <th>To</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.userId?.name || "N/A"}</td>
              <td>{booking.carId?.name || "N/A"}</td>
              <td>{formatDate(booking.startDate)}</td>
              <td>{formatDate(booking.endDate)}</td>
              <td>${booking.totalPrice}</td>
              <td>
                <Badge bg={booking.status === "Cancelled" ? "danger" : "success"}>
                  {booking.status || "Confirmed"}
                </Badge>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(booking._id)}
                  disabled={booking.status === "Cancelled"} // Disable button if the booking is already cancelled
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageBookings;
