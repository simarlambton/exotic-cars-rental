import { loadStripe } from "@stripe/stripe-js";

// Replace this with your actual Stripe public key
const stripePromise = loadStripe("pk_test_51R4HZC03DB44JiOZcYXwvH1uy4HBngvbUD6yNZiz1cZhU9wwC6pRmM5w0UUvwWL1ZUacWqsVeovPNr33Chbiz6Hd00OEvd50Gu");

export default stripePromise;
