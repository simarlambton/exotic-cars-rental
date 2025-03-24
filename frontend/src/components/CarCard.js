// src/components/CarCard.js
import React from "react";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {

  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card className="shadow rounded">
        <Card.Img
          variant="top"
          src={car.image}
          style={{ height: "200px", objectFit: "cover" }}
          alt={car.name}
        />
        <Card.Body>
          <Card.Title>{car.name}</Card.Title>
          <Card.Text>
            Brand: {car.brand} <br />
            Model: {car.model} <br />
            Color: {car.color} <br />
            $ {car.pricePerDay}/day
          </Card.Text>
          <Button as={Link} to={`/car/${car._id}`} variant="dark">
            View Details
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default CarCard;
