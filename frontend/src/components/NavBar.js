import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={logo} alt="Exotic Cars Rental" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cars">Browse Cars</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

            {user ? (
              <>
                {!user.isAdmin && (
                  <>
                    <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                    <Nav.Link as={Link} to="/my-bookings">My Bookings</Nav.Link>
                  </>
                )}
                {user.isAdmin && (
                  <NavDropdown title="Admin">
                    <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/manage-cars">Manage Cars</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/manage-users">Manage Users</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/manage-bookings">Manage Bookings</NavDropdown.Item>
                  </NavDropdown>
                )}
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
