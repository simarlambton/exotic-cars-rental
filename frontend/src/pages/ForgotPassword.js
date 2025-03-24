import { useState } from "react";
import { forgotPassword } from "../api/authApi";
import { Container, Form, Button, Alert } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage("Reset link sent to your email.");
    } catch (err) {
      setError("Error sending reset email.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Forgot Password</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleForgotPassword}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Send Reset Link
        </Button>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
