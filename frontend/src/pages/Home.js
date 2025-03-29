import React from "react";
import HeroSlider from "../components/HeroSlider";
import CarCard from "../components/CarCard";
import { getAllCars } from "../api/carApi";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Image from "../assets/group.jpg";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await getAllCars();
      setCars(res);
    };
    fetchCars();
  }, []);

  return (
    <>
      <HeroSlider />

      <div className="container text-center mt-5 ">
        <div className="row align-items-center justify-content-center">
        <img className="d-block w-75" src={Image} alt="Cars" />
        </div>
      </div>

      <Container className="mt-5">
        <h2 className="py-5 fw-semibold fst-italic text-uppercase text-center">Featured Cars</h2>
        <Row>
          {cars.slice(0, 3).map((car) => (
            <Col key={car._id} md={4} className="mb-4">
              <CarCard car={car} />
            </Col>
          ))}
        </Row>
      </Container>


    </>
  );
};

export default Home;
