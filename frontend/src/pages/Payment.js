import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { createPaymentIntent, confirmPayment } from "../api/paymentApi";
import { createBooking } from "../api/bookingApi";
import { useAuth } from "../context/AuthContext";
import { getCarById } from "../api/carApi";
import { toast } from "react-toastify";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const carId = searchParams.get("carId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const totalPrice = searchParams.get("totalPrice");

  const [clientSecret, setClientSecret] = useState("");
  const [car, setCar] = useState(null);

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await getCarById(carId);
        setCar(res);
      } catch (err) {
        toast.error("Failed to load car details");
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  // Create payment intent
  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const price = parseInt(totalPrice);
        if (isNaN(price)) {
          toast.error("Invalid price. Cannot proceed with payment.");
          return;
        }

        const res = await createPaymentIntent({ amount: price * 100 });
        setClientSecret(res.clientSecret);
      } catch (err) {
        toast.error("Failed to create payment intent");
      }
    };

    getClientSecret();
  }, [totalPrice]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError || paymentIntent.status !== "succeeded") {
      toast.error("Payment failed");
      return;
    }

    try {
      const booking = await createBooking({
        carId,
        startDate,
        endDate,
        totalPrice: parseInt(totalPrice),
      });

      await confirmPayment({
        userId: user._id,
        bookingId: booking.booking._id,
        amount: parseInt(totalPrice) * 100,
        currency: "usd",
        transactionId: paymentIntent.id,
      });

      toast.success("Payment successful and booking confirmed!");
      navigate("/my-bookings");
    } catch (err) {
      toast.error("Something went wrong after payment");
      console.error(err);
    }
  };

  return (
    <Container className="mt-5 pt-5">
      
      <Row className=" pt-5 mb-4 gap-md-0 gap-4">
        {/* Car info and booking details */}
        {car && (
          <Col md={6}>
            <Card>
              <Card.Img variant="top" src={car.image} />
              <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <Card.Text>
                  <strong>Price per day:</strong> ${car.pricePerDay}
                </Card.Text>
                <Card.Text>
                  <strong>Start Date:</strong> {startDate}
                </Card.Text>
                <Card.Text>
                  <strong>End Date:</strong> {endDate}
                </Card.Text>
                <Card.Text>
                  <strong>Total Price:</strong> ${totalPrice}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
        <Col md={6}>

          {/* Payment form */}
          <h2>Payment Details</h2>
          <form onSubmit={handlePayment}>
            <div className="my-5">
              <CardElement />
            </div>
            <Button variant="dark w-100" type="submit" disabled={!stripe}>
              Pay ${totalPrice}
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
