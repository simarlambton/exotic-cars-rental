import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        'service_zj02937', // Your Service ID from EmailJS
        'template_shii2po', // Your Template ID from EmailJS
        e.target, // The form element
        'RjoW8WG4Ot5EyzAcD' // Your User ID from EmailJS
      );
      console.log(result.text);  // Log the response if successful
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form fields
    } catch (error) {
      console.error(error);
      alert('Failed to send message, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-5 py-5">
      <motion.h1
        className="text-center my-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h1>

      <motion.p
        className="text-center lead mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Have questions about bookings, partnerships, or just want to say hello?
        We’d love to hear from you!
      </motion.p>

      <Row className="g-4">
        {/* Contact Details */}
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="mb-4">Contact Info</Card.Title>
                <p>
                  <FaPhone className="me-2 text-primary" /> +1 (800) 555‑CARS
                </p>
                <p>
                  <FaEnvelope className="me-2 text-success" /> support@exoticcars.com
                </p>
                <p>
                  <FaMapMarkerAlt className="me-2 text-danger" /> 789 Luxury Blvd, Toronto, ON
                </p>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* Contact Form */}
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title className="mb-4">Send a Message</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Type your message..."
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button variant="dark" type="submit" className="w-100" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
