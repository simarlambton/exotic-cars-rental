import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../api/carApi";
import { Container, Button, Row, Col, Image, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { user } = useAuth();
  const { id } = useParams(); // Ensure you're correctly retrieving the carId from URL
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  // Fetch car details based on carId from URL
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await getCarById(id);
        setCar(res);
      } catch (err) {
        toast.error("Failed to load car details");
      }
    };

    if (id) fetchCar();
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      navigate(`/login`);
      toast.error("You need to be logged in to book this car!");
      return;
    }
    if (!car) return;

    // Navigate to the booking page for the selected car
    navigate(`/booking/${car._id}`);
  };

  if (!car) {
    return <div className="mt-5 pt-5 text-center">Loading car details...</div>;
  }

  return (
    <Container className="mt-5 pt-5">
      <Row className="align-items-center">
        <Col md={12}>
          {/* Car Image */}
          <Card className="mb-4">
            <Image src={car.image} fluid rounded />
          </Card>

          {/* Car Information */}
          <Card className="shadow-lg mb-4">
            <Card.Body>
              <h2 className="mb-4">{car.brand} {car.model} {car.year}</h2>
              {/* <p>
                <strong>Brand:</strong> 
              </p>
              <p>
                <strong>Model:</strong> 
              </p>
              <p>
                <strong>Year:</strong> 
              </p> */}
              <p>
                <strong>Color:</strong> {car.color}
              </p>
              <p>
                <strong>Price per day:</strong> ${car.pricePerDay}
              </p>
              
            </Card.Body>
          </Card>

          {/* Book Button and Car Info */}
          <div className="text-center mb-4">
            <Button
              onClick={handleBooking}
              disabled={user?.isAdmin} // Disable for admin users
              variant="dark"
              className="w-100 mb-3" // Proper usage of w-100 class name
            >
              {user?.isAdmin ? "Admins cannot book this car" : "Book This Car"}
            </Button>
          </div>
        </Col> 
      </Row>

       {/* Static Rental Information Section */}
       <Row className="mt-5">
        <Col md={12}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <Card.Title className="mb-5 fw-semibold">Rental Information (Common Across All Cars)</Card.Title>
              <Row>
                <Col md={6}>
                  <p><strong>Rental Duration:</strong> Minimum 1 Day</p>
                  <p><strong>Insurance:</strong> Standard Insurance Included</p>
                  <p><strong>Mileage Limit:</strong> 200 km/day (Additional fees for extra mileage)</p>
                  <p><strong>Fuel Policy:</strong> Full-to-Full</p>
                  <p><strong>Roadside Assistance:</strong> 24/7 Roadside Assistance Included</p>
                </Col>
                <Col md={6}>
                  <p><strong>Cancellation Policy:</strong> Free cancellation up to 48 hours before pickup</p>
                  <p><strong>Delivery & Pickup:</strong> Free delivery and pickup within 10 km</p>
                  <p><strong>Age Requirement:</strong> 21+ (Young Driver Fee applies for drivers under 25)</p>
                  <p><strong>Security Deposit:</strong> $200 (Refundable)</p>
                  <p><strong>Payment Methods:</strong> Credit/Debit Cards, PayPal</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetails;
