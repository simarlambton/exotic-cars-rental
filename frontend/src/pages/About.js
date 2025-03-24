import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="my-5">
        <h2>About Exotic Cars Rental</h2>
        <p>
          Exotic Cars Rental is your premium destination for luxury and high-performance car rentals.
          Whether you're planning a special event or just want to experience driving excellence, we provide
          top-tier vehicles and exceptional service.
        </p>
        <p>
          Our fleet includes brands like Ferrari, Lamborghini, Porsche, and more. We're dedicated to
          making your rental smooth, secure, and exciting.
        </p>
      </Container>
    </motion.div>
  );
};

export default About;
