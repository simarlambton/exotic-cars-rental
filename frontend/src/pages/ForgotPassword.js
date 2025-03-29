import React, { useState } from "react";
import { forgotPassword } from "../api/authApi";
import { toast } from "react-toastify";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success("Reset link sent to your email");
    } catch {
      toast.error("Failed to send reset link");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <Card className="p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="mb-4 text-center">Forgot Your Password?</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Email Address</Form.Label>
            <InputGroup>
              <InputGroup.Text><Mail size={16} /></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100">
            Send Reset Link
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
