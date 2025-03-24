import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Container className="my-5">
      <h2>Contact Us</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Your Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Your Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">Send Message</Button>
      </Form>
    </Container>
  );
};

export default Contact;
