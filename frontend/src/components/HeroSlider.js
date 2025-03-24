import React from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import car1 from "../assets/herobanner.jpg"; // Use same image for all 3 slides

const HeroSlider = () => {
  const images = [car1, car1, car1]; // Using same image for now

  return (
    <Carousel fade interval={4000}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
          <motion.img
            className="d-block w-100 hero-img"
            src={image}
            alt={`Slide ${idx + 1}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          />
          <Carousel.Caption className="text-start">
            <motion.h1
              className="display-4 fw-bold"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Rent Your Dream Car
            </motion.h1>
            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Discover luxury and performance like never before.
            </motion.p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSlider;
