import React, { useEffect, useState } from "react";
import { getAllCars } from "../api/carApi";
import CarCard from "../components/CarCard";
import { Container, Row, Col, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa"; // Search icon

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
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm)
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

  const handleSearchClick = () => {
    setSearchTerm(searchTerm);
  };

  return (
    <Container className="my-5 pt-5">
      <h2 className="text-center my-4">Available Cars</h2>

      {/* Filters */}
      <Row className="mb-4 row gap-md-0 gap-3">
        <Col md={4}>
          <div className="search-bar">
            <Form.Control
              type="text"
              placeholder="Search by car name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="search-icon" onClick={handleSearchClick} />
          </div>
        </Col>
        <Col md={4}>
          <div className="dropdown-filter">
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
          </div>
        </Col>
        <Col md={4}>
          <div className="range-slider">
            <Form.Label>Price Range</Form.Label>
            <Form.Range
              min={0}
              max={1000}
              step={5}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <div className="price-range-display">
              <span>Up to ${priceRange[1]}</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Car List */}
      <Row>
        {filteredCars.map((car) => (
          <Col md={4} sm={6} xs={12} key={car._id || car.name} className="mb-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <CarCard car={car} />
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cars;
