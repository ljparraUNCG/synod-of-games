"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/auth/signup`, { username, password });
      alert("Signup successful!");
      router.push("/login"); // redirect to login
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Signup</h1>
      <form onSubmit={signup}>
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
