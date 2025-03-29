const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    console.log("🔁 Creating payment intent for amount:", amount);

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount provided" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("❌ Stripe error:", error);
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
      paymentStatus: "Success",
    });

    res.status(201).json({ message: "Payment recorded", payment });
  } catch (error) {
    console.error("❌ Error recording payment:", error);
    res.status(500).json({ message: "Error recording payment", error: error.message });
  }
};
