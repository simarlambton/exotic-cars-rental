// src/components/CarCard.js
import React from "react";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const { name, brand, model, year, image, _id } = car;

  return (
    <motion.div
      className="col-12 Card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg border-0 rounded text-center pb-3">
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          className="img-fluid rounded-top"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="fw-bold text-center">{name}</Card.Title>
          <Card.Subtitle className="mb-5 text-muted text-center">
            {brand} {model} ({year})
          </Card.Subtitle>

          <Link to={`/cars/${_id}`}>
            <Button className="rounded-3 px-5" variant="outline-dark">View Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default CarCard;
