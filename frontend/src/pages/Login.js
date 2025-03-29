import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { Eye, EyeOff, Mail } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 pt-5">
      <Card className="p-4 shadow" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="mb-4 text-center">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text><Mail size={16} /></InputGroup.Text>
              <Form.Control
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </InputGroup.Text>
              <Form.Control
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100 mt-3">
            Login
          </Button>

          <div className="mt-3 text-center">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
