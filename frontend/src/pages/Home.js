// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAllCars } from "../api/carApi";
import CarCard from "../components/CarCard";
import HeroSlider from "../components/HeroSlider";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (err) {
        toast.error("Failed to load cars");
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <HeroSlider />

      <Container className="my-5">
        <motion.h2
          className="text-center mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Featured Cars
        </motion.h2>

        <Row>
          {cars.slice(0, 3).map((car) => (
            <Col md={4} key={car._id} className="mb-4">
              <CarCard car={car} />
            </Col>
          ))}
        </Row>
      </Container>
      {/* WHY CHOOSE US SECTION */}
      <Container className="my-5">
        <motion.h2
          className="text-center mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us?
        </motion.h2>
        <Row className="text-center">
          <Col md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 shadow-sm rounded bg-white"
            >
              <i className="bi bi-speedometer2 fs-1 text-primary mb-3"></i>
              <h5>Fast Booking</h5>
              <p>Book your ride in minutes using our smooth & secure system.</p>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 shadow-sm rounded bg-white"
            >
              <i className="bi bi-shield-lock fs-1 text-success mb-3"></i>
              <h5>Secure Payments</h5>
              <p>Trusted payment processing through Stripe and encryption.</p>
            </motion.div>
          </Col>
          <Col md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-3 shadow-sm rounded bg-white"
            >
              <i className="bi bi-star fs-1 text-warning mb-3"></i>
              <h5>Top Rated Cars</h5>
              <p>We only list premium vehicles rated 4.8 stars and up.</p>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* TESTIMONIALS SECTION */}
      <Container className="my-5">
        <motion.h2
          className="text-center mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say
        </motion.h2>
        <Row className="text-center">
          {[
            {
              name: "Harpreet",
              comment:
                "Best car rental experience ever! Easy and fast booking.",
              rating: "⭐⭐⭐⭐⭐",
            },
            {
              name: "Simran",
              comment: "Clean cars, friendly service. Totally recommend it!",
              rating: "⭐⭐⭐⭐⭐",
            },
            {
              name: "Aman",
              comment: "Affordable prices for luxury cars. Loved it!",
              rating: "⭐⭐⭐⭐⭐",
            },
          ].map((review, index) => (
            <Col md={4} key={index} className="mb-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 shadow rounded bg-white"
              >
                <p className="text-muted">{review.comment}</p>
                <h6 className="fw-bold mt-2">{review.name}</h6>
                <div className="text-warning">{review.rating}</div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA SECTION */}
      <Container fluid className="bg-dark text-white text-center py-5 mt-5">
        <motion.h3
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Hit the Road?
        </motion.h3>
        <p className="mb-4">
          Start your adventure with Exotic Cars Rental today.
        </p>
        <a href="/cars" className="btn btn-warning btn-lg">
          Browse Cars
        </a>
      </Container>
    </>
  );
};

export default Home;
