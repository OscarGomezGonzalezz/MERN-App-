import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser} from "../services/authService";
import { Link } from "react-router-dom";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username && password) {
      try{
        const data = await loginUser(username, password);
        localStorage.setItem("token", data.token);
        navigate("/tasks");
      } 
      catch (error) {
        console.error("Error logging in", error);
      }
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;
