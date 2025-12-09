"use client";

import Link from "next/link";

export default function Navbar() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link> |{" "}
      {user ? (
        <>
          <span>Welcome, {user.username}</span>{" "}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link> | <Link href="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}
