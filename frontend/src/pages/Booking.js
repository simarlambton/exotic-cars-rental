import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { getCarById } from "../api/carApi"; // Ensure this API is correctly defined
import { getCarAvailability } from "../api/bookingApi"; // Use the admin API to get all bookings
import { toast } from "react-toastify";

const Booking = () => {
  const { carId } = useParams(); // Get carId from the URL
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBooked, setIsBooked] = useState(false); // To track if the car is booked for selected dates

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await getCarById(carId);
        setCar(res);
      } catch (err) {
        toast.error("Failed to fetch car details");
      }
    };

    fetchCar();
  }, [carId]);

  // Calculate total price when startDate or endDate changes
  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      if (days > 0) {
        setTotalPrice(days * car.pricePerDay);
      } else {
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, car]);

  // Fetch all bookings and check if the selected dates overlap with any existing bookings
  useEffect(() => {
    if (startDate && endDate) {
      const checkAvailability = async () => {
        try {
          const bookings = await getCarAvailability(carId, startDate, endDate); // Fetch all bookings from the admin API
          console.log(bookings);

          setIsBooked(false);
          // const isCarBooked = bookings.some((booking) => {
          //   const bookingStartDate = new Date(booking.startDate);
          //   const bookingEndDate = new Date(booking.endDate);
          //   const newStartDate = new Date(startDate);
          //   const newEndDate = new Date(endDate);

          //   // Check if the selected dates overlap with any existing booking
          //   return (
          //     (newStartDate >= bookingStartDate && newStartDate <= bookingEndDate) ||
          //     (newEndDate >= bookingStartDate && newEndDate <= bookingEndDate)
          //   );
          // });

          // setIsBooked(isCarBooked);  // Set the availability status
        } catch (err) {
          console.log(err);
          setIsBooked(true);

          toast.error(
            err.response?.data?.message || "Failed to check availability"
          );
        }
      };

      checkAvailability();
    }
  }, [startDate, endDate, carId]); // Run when startDate, endDate, or carId changes

  // Handle the booking confirmation and payment process
  const handleProceedToPayment = () => {
    if (!startDate || !endDate) {
      toast.error("Please select a valid date range.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date.");
      return;
    }

    if (isBooked) {
      toast.error("The car is already booked for the selected dates.");
      return;
    }

    navigate(
      `/payment?carId=${carId}&startDate=${startDate}&endDate=${endDate}&totalPrice=${totalPrice}`
    );
  };

  if (!car)
    return <div className="mt-5 pt-5 text-center">Loading car details...</div>;

  return (
    <Container className="mt-5 pt-5">
      <h2>Book: {car.name}</h2>
      <p>Price per day: ${car.pricePerDay}</p>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            min={new Date().toISOString().split("T")[0]} // Ensure the user cannot select past dates
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            min={startDate} // End date must be after the start date
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        <p>
          Total Price: <strong>${totalPrice}</strong>
        </p>

        <Button
          onClick={handleProceedToPayment}
          disabled={!startDate || !endDate || totalPrice <= 0 || isBooked}
        >
          {isBooked
            ? "Car is already booked for selected dates"
            : "Proceed to Payment"}
        </Button>
      </Form>
    </Container>
  );
};

export default Booking;
