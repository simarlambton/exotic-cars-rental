import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user?.isAdmin) {
    return <div className="text-center mt-5"><h4>Access Denied: Admins Only</h4></div>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Manage Cars</Card.Title>
              <Card.Text>View, add, and delete available cars.</Card.Text>
              <Button onClick={() => navigate("/admin/manage-cars")} variant="primary">
                Go to Cars
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Manage Users</Card.Title>
              <Card.Text>View all registered users.</Card.Text>
              <Button onClick={() => navigate("/admin/manage-users")} variant="primary">
                Go to Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Manage Bookings</Card.Title>
              <Card.Text>Review and manage all bookings.</Card.Text>
              <Button onClick={() => navigate("/admin/manage-bookings")} variant="primary">
                Go to Bookings
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
