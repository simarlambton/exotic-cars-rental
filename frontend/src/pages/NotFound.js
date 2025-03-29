import React from "react";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="mt-5 pt-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Oops! Page not found.</p>
    </Container>
  );
};

export default NotFound;
