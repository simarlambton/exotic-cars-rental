import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "./stripePromise";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import MyBookings from "./pages/MyBookings";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageCars from "./pages/ManageCars";
import ManageUsers from "./pages/ManageUsers";
import ManageBookings from "./pages/ManageBookings";

import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/booking/:carId" element={<PrivateRoute><Booking /></PrivateRoute>} />
        
        {/* ✅ Stripe-wrapped Payment route */}
        <Route path="/payment" element={
          <PrivateRoute>
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </PrivateRoute>
        } />

        <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/manage-cars" element={<PrivateRoute adminOnly><ManageCars /></PrivateRoute>} />
        <Route path="/admin/manage-users" element={<PrivateRoute adminOnly><ManageUsers /></PrivateRoute>} />
        <Route path="/admin/manage-bookings" element={<PrivateRoute adminOnly><ManageBookings /></PrivateRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
