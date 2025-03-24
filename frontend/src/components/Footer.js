import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <Container>
        <Row className="gy-3">
          <Col md={4}>
            <h5>Exotic Cars Rental</h5>
            <p>Luxury and performance at your fingertips.</p>
          </Col>
          <Col md={4}>
            <h6>Contact</h6>
            <p>Email: contact@exoticcars.com</p>
            <p>Phone: +1 (234) 567-8901</p>
          </Col>
          <Col md={4}>
            <h6>Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white">
                <i className="bi bi-twitter fs-5"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="border-secondary mt-4" />
        <div className="text-center small text-secondary">
          &copy; {new Date().getFullYear()} Exotic Cars Rental. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
