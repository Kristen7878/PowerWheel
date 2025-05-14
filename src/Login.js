import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const LoginSubmit = () => {
    if (username === "admin" && password === "1234") {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="login-container"
      style={{ padding: "40px", textAlign: "center" }}
    >
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
      </div>
      <button onClick={LoginSubmit} className="custom-button">
        Login
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
