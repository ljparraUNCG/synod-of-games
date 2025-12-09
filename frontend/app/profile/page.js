"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return <h1>You are not logged in.</h1>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Profile</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>

      
    </div>
  );
}
