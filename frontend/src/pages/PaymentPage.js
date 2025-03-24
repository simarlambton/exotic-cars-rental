// src/pages/PaymentPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getBookingById } from "../api/bookingApi";
import { createPaymentIntent, confirmPayment } from "../api/paymentApi";
import { toast } from "react-toastify";
import { Container, Button, Spinner } from "react-bootstrap";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getBookingById(bookingId);
        setBooking(res);
      } catch (err) {
        toast.error("Failed to fetch booking");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handlePayment = async () => {
    try {
      setPaying(true);
      const amountInCents = booking.totalPrice * 100;
      const { clientSecret } = await createPaymentIntent(amountInCents);

      // Simulate payment (this would normally go through Stripe UI)
      const transactionId = `txn_${Math.random().toString(36).substring(2, 15)}`;

      await confirmPayment({
        userId: user._id,
        bookingId,
        amount: booking.totalPrice,
        currency: "usd",
        transactionId,
      });

      toast.success("Payment Successful!");
      navigate("/my-bookings");
    } catch (error) {
      toast.error("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <h2>Complete Payment</h2>
      <p><strong>Car:</strong> {booking?.car?.name || "N/A"}</p>
      <p><strong>Amount:</strong> ₹ {booking?.totalPrice}</p>
      <Button variant="success" onClick={handlePayment} disabled={paying}>
        {paying ? "Processing..." : "Pay Now"}
      </Button>
    </Container>
  );
};

export default PaymentPage;
