import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaUser, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Icons
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Populate form fields with current user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Container className="my-5 py-5">
      <Row className="py-md-5 justify-content-center">
        <Col md={6}>
          <h2 className="text-center my-4">My Profile</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <FaUser className="me-2" /> Name
              </Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="input-field"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaEnvelope className="me-2" /> Email
              </Form.Label>
              <Form.Control
                name="email"
                value={formData.email}
                readOnly
                disabled
                className="input-field"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <FaPhoneAlt className="me-2" /> Phone
              </Form.Label>
              <Form.Control
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="input-field"
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
