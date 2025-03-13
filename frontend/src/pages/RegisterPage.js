// src/components/RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";


function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const data = await registerUser(username, password);
      localStorage.setItem("token", data.token);
      navigate("/tasks"); // Redirect to task app after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account? <Link to="/login">Login here</Link>
    </p>
    </div>
    
    
  );
}

export default RegisterPage;
