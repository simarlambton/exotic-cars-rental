import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import { Alert, Button, Form, Container } from "react-bootstrap";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, newPassword);
      setMessage("Password reset successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.error || "Failed to reset password. The token may be invalid or expired.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Reset Password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleReset}>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="success" className="mt-3 w-100">Reset Password</Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
