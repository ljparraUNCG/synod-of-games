"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/login">Login</Link> |{" "}
      <Link href="/signup">Signup</Link> |{" "}
      <Link href="/profile">Profile</Link>
      
      <span style={{ marginLeft: "20px" }}>
        {user ? (
          <>
            Logged in as: <b>{user.username}</b>
            <button onClick={logout} style={{ marginLeft: "10px" }}>
              Logout
            </button>
          </>
        ) : (
          "Not logged in"
        )}
      </span>
    </nav>
  );
}
