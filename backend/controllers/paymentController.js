const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: "Payment intent creation failed", error: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { userId, bookingId, amount, currency, transactionId } = req.body;

    const payment = await Payment.create({
      userId,
      bookingId,
      amount,
      currency,
      transactionId,
      paymentStatus: "Success", // You can extend this to verify via Stripe Webhooks later
    });

    res.status(201).json({ message: "Payment recorded", payment });
  } catch (error) {
    res.status(500).json({ message: "Error recording payment", error: error.message });
  }
};
