"use client";

import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/gamesList">Games</Link> |{" "}
      {!user && (
        <>
          <Link href="/login">Login</Link> | <Link href="/signup">Signup</Link>
        </>
      )}
      {user && (
        <>
          <Link href="/profile">Profile</Link> |{" "}
          <Link href="/my-reviews">My Reviews</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
