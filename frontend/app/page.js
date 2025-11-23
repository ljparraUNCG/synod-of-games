"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  //placeholder game list 
  //replace with IGDB API later
  const [games] = useState([
    { id: 1, name: "Elden Ring" },
    { id: 2, name: "God of War" },
    { id: 3, name: "Fortnite" },
  ]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Synod of Games</h1>
      <h2>Select a game to see reviews</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Link href={`/game/${game.id}`}>{game.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
