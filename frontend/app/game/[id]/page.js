"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function GamePage() {
  const params = useParams();
  const gameId = params.id;

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const loadGame = async () => {
    try {
      const res = await axios.get(`${API_BASE}/games/details/${gameId}`);
      // IGDB returns an array of results for POST queries — take first
      setGame(Array.isArray(res.data) ? res.data[0] : res.data);
    } catch (err) {
      console.error("Error loading game:", err);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/reviews/${gameId}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Error loading reviews:", err);
    }
  };

  useEffect(() => {
    loadGame();
    loadReviews();
  }, [gameId]);

  const submitReview = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("You must be logged in to post a review.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/reviews`, {
        gameId: Number(gameId),
        username: storedUser.username,
        userId: storedUser.id,
        content,
        rating,
      });
      setContent("");
      setRating(0);
      loadReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>{game ? game.name : "Loading..."}</h1>

      {game?.cover?.url && (
        <img
          className="game-cover"
          style={{
            width: 260,
            height: 350,
            objectFit: "cover",
            borderRadius: 12,
          }}
          src={"https:" + game.cover.url.replace("t_thumb", "t_cover_big")}
          alt={game.name}
        />
      )}

      {game?.summary && (
        <div className="card" style={{ marginTop: 12 }}>
          {game.summary}
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <h2>Write a review</h2>
        <form onSubmit={submitReview} className="card">
          <textarea
            className="input"
            rows={4}
            placeholder="What do you think?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            className="input"
            type="number"
            min="0"
            max="10"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <button className="button" type="submit">
            Post Review
          </button>
        </form>
      </div>

      <div style={{ marginTop: 18 }}>
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p className="small-muted">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="card">
              <div className="space-between">
                <strong>{r.username}</strong>
                <span className="small-muted">{r.rating}/10</span>
              </div>
              <p style={{ marginTop: 8 }}>{r.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
