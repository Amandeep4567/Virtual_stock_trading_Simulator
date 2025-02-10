import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      // Display error message to the user
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
