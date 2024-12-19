import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { username, password },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        // Redirect based on role
        const user = response.data;
        if (user.role === "ROLE_USER") {
          navigate("/dashboard");
          window.location.reload();
        } else if (user.role === "ROLE_ADMIN") {
          navigate("/admin");
          window.location.reload();
        }
      }
    } catch (err) {
      setError("Incorrect credentials, please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>

      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Don't have an account? <a href="/signup">Create One!</a>
      </p>
    </div>
  );
};

export default LoginPage;
