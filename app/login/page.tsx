"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div>
      <h1>Login Page</h1>

      <p><strong>Dummy Admin Credentials</strong></p>
      <p>Username: <code>admin</code></p>
      <p>Password: <code>admin123</code></p>

      <div style={{ marginTop: "1rem" }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "0.5rem" }}>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button style={{ marginTop: "1rem" }} onClick={handleLogin}>
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}