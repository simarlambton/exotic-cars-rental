// src/pages/About.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCarSide, FaHandshake, FaRocket, FaGlobe } from "react-icons/fa";

const About = () => {
  return (
    <Container className="my-5 py-5">
      <motion.h1
        className="text-center my-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Exotic Cars Rental
      </motion.h1>

      <motion.p
        className="text-center lead mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Experience luxury, speed, and elegance with every ride. Our mission is
        to make exotic car rentals seamless, thrilling, and accessible.
      </motion.p>

      <Row className="g-4">
        <Col md={12} lg={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <FaCarSide size={40} className="mb-3 text-primary" />
                <Card.Title>Luxury Fleet</Card.Title>
                <Card.Text>
                  Choose from world-class luxury cars – Ferrari, Lamborghini,
                  Rolls-Royce, and more.
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={12} lg={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <FaHandshake size={40} className="mb-3 text-success" />
                <Card.Title>Reliable Service</Card.Title>
                <Card.Text>
                  Exceptional customer experience, timely bookings, and 24/7
                  support.
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={12} lg={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <FaRocket size={40} className="mb-3 text-danger" />
                <Card.Title>Performance</Card.Title>
                <Card.Text>
                  Drive the fastest and most powerful cars engineered for
                  excellence.
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={12} lg={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="text-center shadow-sm h-100">
              <Card.Body>
                <FaGlobe size={40} className="mb-3 text-info" />
                <Card.Title>Global Reach</Card.Title>
                <Card.Text>
                  Expanding to top cities around the world with premium exotic
                  rentals.
                </Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
