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
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="container">
      <h1>Create account</h1>
      <form onSubmit={signup} className="card">
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
          Sign up
        </button>
      </form>
    </div>
  );
}
