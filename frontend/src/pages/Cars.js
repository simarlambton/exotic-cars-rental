import React, { useEffect, useState } from "react";
import { getAllCars } from "../api/carApi";
import CarCard from "../components/CarCard";
import { Container, Row, Col, Form } from "react-bootstrap";
import { motion } from "framer-motion";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
        setFilteredCars(data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let results = cars;

    if (searchTerm) {
      results = results.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (brandFilter) {
      results = results.filter((car) => car.brand === brandFilter);
    }

    results = results.filter(
      (car) => car.pricePerDay >= priceRange[0] && car.pricePerDay <= priceRange[1]
    );

    setFilteredCars(results);
  }, [searchTerm, brandFilter, priceRange, cars]);

  const uniqueBrands = [...new Set(cars.map((car) => car.brand))];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Available Cars</h2>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by car name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="">Filter by Brand</option>
            {uniqueBrands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Range
            min={0}
            max={1000}
            step={5}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          />
          <small>Up to ${priceRange[1]} per day</small>
        </Col>
      </Row>

      {/* Car List */}
      <Row>
        {filteredCars.map((car) => (
          <Col md={4} sm={6} xs={12} key={car._id || car.name} className="mb-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              {/* Optional: Pass key to child if it's mapping inside */}
              <CarCard car={car} />
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cars;
