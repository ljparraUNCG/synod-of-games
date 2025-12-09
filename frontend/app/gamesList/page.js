"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${API_BASE}/games`); // your backend endpoint for all games
        setGames(res.data);
      } catch (err) {
        console.error("Failed to load games", err);
      }
      setLoading(false);
    };

    fetchGames();
  }, []);

  if (loading) return <p>Loading games...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Games</h1>
      {games.length === 0 && <p>No games found.</p>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.cover?.url && (
              <div>
                <img
                  src={
                    game.cover?.url
                      ? "https:" +
                        game.cover.url.replace("t_thumb", "t_cover_big")
                      : "/no-image.png"
                  }
                  alt={game.name}
                  style={{
                    width: "150px",
                    marginTop: "0.5rem",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
            <strong>{game.name}</strong> - {game.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
