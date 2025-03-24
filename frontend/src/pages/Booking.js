// src/pages/Booking.js
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../api/carApi";
import { createBooking } from "../api/bookingApi";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  Container,
  Form,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";

const Booking = () => {
  const { id: carId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const carData = await getCarById(carId);
      setCar(carData);
    } catch (err) {
      toast.error("Failed to fetch car");
    } finally {
      setLoading(false);
    }
  }, [carId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (startDate && endDate && car?.pricePerDay) {
      const days =
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
      if (days > 0) {
        setTotalPrice(days * car.pricePerDay);
      } else {
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, car]);

  const handleConfirm = async () => {
    try {
      const bookingData = {
        userId: user._id,
        carId,
        startDate,
        endDate,
        totalPrice,
      };
      const response = await createBooking(bookingData);
      const bookingId = response._id;
      navigate(`/payment/${bookingId}`);
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      toast.error("Please select valid dates");
      return;
    }
    setShowModal(true);
  };

  const minDate = new Date().toISOString().split("T")[0];

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <h2>Book {car?.name}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            min={minDate}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            min={startDate || minDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        {totalPrice > 0 && (
          <p className="fw-bold mb-2">Total: ₹ {totalPrice}</p>
        )}

        <Button variant="primary" type="submit">
          Confirm Booking
        </Button>
      </Form>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Car: {car?.name}</p>
          <p>Start Date: {startDate}</p>
          <p>End Date: {endDate}</p>
          <p>Total Price: ₹ {totalPrice}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Proceed to Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Booking;
