import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "../../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3030/api/auth/login", { email, password });
      login(response.data.token, response.data.isAdmin);
      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        if (response.data.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Error logging in.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p className="signup-link pt-3 m-0">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>

      <p className="forgot-password-link pt-2">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;
