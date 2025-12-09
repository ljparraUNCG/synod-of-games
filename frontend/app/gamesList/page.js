"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${API_BASE}/games`);
        setGames(res.data);
      } catch (err) {
        console.error("Failed to load games", err);
      }
      setLoading(false);
    };
    fetchGames();
  }, []);

  if (loading) return <p className="container">Loading games...</p>;

  return (
    <div className="container">
      <h1 style={{ marginBottom: 12 }}>All Games</h1>

      {games.length === 0 && (
        <div className="card small-muted">No games found.</div>
      )}

      <div className="game-grid" style={{ marginTop: 12 }}>
        {games.map((game) => (
          <Link key={game.id} href={`/game/${game.id}`}>
            <div className="game-card">
              <img
                className="game-cover"
                src={
                  game.cover?.url
                    ? "https:" +
                      game.cover.url.replace("t_thumb", "t_cover_big")
                    : "/no-image.png"
                }
                alt={game.name}
              />
              <h3 style={{ marginTop: 8 }}>{game.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
