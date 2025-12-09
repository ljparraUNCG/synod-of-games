"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyReviewsPage() {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    if (!user) return;

    async function load() {
      const res = await axios.get(`${API}/reviews/user/${user.id}`);
      setReviews(res.data);
    }

    load();
  }, [user]);

  const deleteReview = async (id) => {
    await axios.delete(`${API}/reviews/${id}`);
    setReviews(reviews.filter((r) => r.id !== id));
  };

  const startEdit = (review) => {
    setEditing(review.id);
    setEditContent(review.content);
    setEditRating(review.rating);
  };

  const saveEdit = async (id) => {
    await axios.put(`${API}/reviews/${id}`, {
      content: editContent,
      rating: editRating,
    });

    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, content: editContent, rating: editRating } : r
      )
    );

    setEditing(null);
  };

  if (!user) return <p>You must be logged in.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Reviews</h1>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>{review.gameName}</h3>

          {editing === review.id ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <br />
              <input
                type="number"
                value={editRating}
                min="1"
                max="10"
                onChange={(e) => setEditRating(e.target.value)}
              />
              <br />
              <button onClick={() => saveEdit(review.id)}>Save</button>
              <button onClick={() => setEditing(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{review.content}</p>
              <p>Rating: {review.rating}/10</p>

              <button onClick={() => startEdit(review)}>Edit</button>
              <button onClick={() => deleteReview(review.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
