"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user)
    return (
      <div className="container">
        <h2>You are not logged in.</h2>
      </div>
    );

  return (
    <div className="container">
      <h1>Profile</h1>
      <div className="card">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p className="small-muted">User ID: {user.id}</p>
      </div>
    </div>
  );
}
