"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState(""); // user search input
  const [games, setGames] = useState([]); // games from IGDB
  const [loading, setLoading] = useState(false); // loading indicator
  const [error, setError] = useState(""); // error messages

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  // fetch games from backend
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
    <div style={{ padding: "2rem" }}>
      <h1>Synod of Games</h1>
      <h2>Search for a game to see reviews</h2>

      {/* Search bar */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter game name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "300px", marginRight: "0.5rem" }}
        />
        <button onClick={fetchGames} style={{ padding: "0.5rem 1rem" }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Game results */}
      <ul>
        {games.map((game) => (
          <li key={game.id} style={{ marginBottom: "1rem" }}>
            <Link href={`/game/${game.id}`}>
              <strong>{game.name}</strong>
            </Link>
            {game.cover?.url && (
              <div>
                <img
                  src={game.cover.url.replace("t_thumb", "t_cover_big")}
                  alt={game.name}
                  style={{ width: "150px", marginTop: "0.5rem" }}
                />
              </div>
            )}
            {game.summary && <p>{game.summary}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
