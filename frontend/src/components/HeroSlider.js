import React from "react";
import { Carousel } from "react-bootstrap";
import car1 from "../assets/banner3.jpg";
import car2 from "../assets/banner4.jpg";
import car3 from "../assets/banner2.jpg";

const HeroSlider = () => {
  return (
    <Carousel fade>
      {[car1, car2, car3].map((img, idx) => (
        <Carousel.Item key={idx}>
          <img className="d-block w-100" src={img} alt={`slide-${idx}`} />
          {/* <Carousel.Caption>
            <h3>Luxury Cars for Rent</h3>
            <p>Drive your dream today</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSlider;
