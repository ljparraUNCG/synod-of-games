"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;
  const { login: contextLogin } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, { username, password });
      contextLogin(res.data); // updates localStorage and context
      setMessage("Logged in successfully!");
      setTimeout(() => router.push("/"), 900);
    } catch (err) {
      console.error(err);
      setMessage("Login failed");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={submit} className="card">
        <input
          className="input"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit">
          Login
        </button>
      </form>
      {message && (
        <div className="card small-muted" style={{ marginTop: 12 }}>
          {message}
        </div>
      )}
    </div>
  );
}
