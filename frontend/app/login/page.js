"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/auth/login`, { username, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      setMessage("Logged in successfully!");

      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage("Login failed");
    }
  };


  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {message && (
        <div
          style={{
            background: "#d4edda",
            color: "#155724",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
