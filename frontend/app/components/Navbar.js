"use client";

import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const pathname = usePathname();

  const isActive = (path) => (pathname === path ? "nav-active" : "");

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className={`nav-logo ${isActive("/")}`}>
          Synod of Games
        </Link>

        <Link
          href="/gamesList"
          className={`nav-link ${isActive("/gamesList")}`}
        >
          Games
        </Link>

        {user && (
          <Link
            href="/my-reviews"
            className={`nav-link ${isActive("/my-reviews")}`}
          >
            My Reviews
          </Link>
        )}
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link href="/login" className={`nav-link ${isActive("/login")}`}>
              Login
            </Link>
            <Link href="/signup" className="nav-button">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/profile"
              className={`nav-link ${isActive("/profile")}`}
            >
              {user.username}
            </Link>
            <button onClick={logout} className="nav-button logout">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
