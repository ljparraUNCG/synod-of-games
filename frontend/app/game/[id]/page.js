"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function GamePage() {
  const params = useParams();
  const gameId = params.id;

  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  
  
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

  //load reviews for this game
  const loadReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/${gameId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  //submit a new review
  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, {
        gameId: Number(gameId),
        username,
        content,
      });
      setUsername("");
      setContent("");
      loadReviews();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Reviews for Game {gameId}</h1>

      <form onSubmit={submitReview} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
        />
        <textarea
          placeholder="Your Review"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "0.5rem",
            width: "300px",
            height: "100px",
          }}
        />
        <button type="submit">Submit Review</button>
      </form>

      <h2>All Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <strong>{r.username}</strong>
            <p>{r.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
