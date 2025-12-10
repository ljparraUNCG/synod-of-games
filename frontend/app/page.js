"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const fetchGames = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${API_BASE}/games/search/${encodeURIComponent(query)}`
      );
      setGames(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch games. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: 8 }}>Synod of Games</h1>
      <p className="small-muted" style={{ marginBottom: 16 }}>
        Basic rules:
        <ul>
          <li>Rate games from 1 to 5 stars.</li>
          <li>Write reviews to share your thoughts.</li>
          <li>Edit or delete your reviews anytime.</li>
          <li>Do not offend anyone or any group of people.</li>
          <li>Do not post slurs or offensive content to this website.</li>
          <li>The Synod of Games DOES NOT approve of any form of negative content 
            that can possibly hurt someone or a group of people.</li>
        </ul>
        
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <input
          className="input"
          placeholder="Search game..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" onClick={fetchGames} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div className="card small-muted">{error}</div>}

      <div style={{ marginTop: 16 }}>
        {games.length === 0 && !loading ? (
          <p className="small-muted">
            No results yet — try searching for "Elden Ring".
          </p>
        ) : (
          <div className="game-grid">
            {games.map((g) => (
              <Link key={g.id} href={`/game/${g.id}`}>
                <div className="game-card">
                  <img
                    className="game-cover"
                    src={
                      g.cover?.url
                        ? "https:" +
                          g.cover.url.replace("t_thumb", "t_cover_big")
                        : "/no-image.png"
                    }
                    alt={g.name}
                  />
                  <h3 style={{ marginTop: 8 }}>{g.name}</h3>
                  <p
                    className="small-muted"
                    style={{ marginTop: 6, fontSize: 13 }}
                  >
                    {g.summary
                      ? g.summary.slice(0, 120) +
                        (g.summary.length > 120 ? "…" : "")
                      : "No summary."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
