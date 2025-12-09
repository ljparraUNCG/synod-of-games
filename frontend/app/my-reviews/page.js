"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyReviewsPage() {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);

  const loadReviews = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API}/reviews/user/${user.id}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Failed loading reviews", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    loadReviews();
  }, [user]);

  const deleteReview = async (id) => {
    if (!confirm("Delete this review?")) return;
    try {
      await axios.delete(`${API}/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (r) => {
    setEditing(r.id);
    setEditContent(r.content);
    setEditRating(r.rating);
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API}/reviews/${id}`, {
        content: editContent,
        rating: editRating,
      });
      setReviews((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, content: editContent, rating: editRating } : r
        )
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="container">Loading user...</p>;
  if (loading) return <p className="container">Loading reviews...</p>;

  return (
    <div className="container">
      <h1>My Reviews</h1>
      {reviews.length === 0 && (
        <div className="card small-muted">
          You have not written any reviews yet.
        </div>
      )}
      {reviews.map((review) => (
        <div key={review.id} className="card">
          <div className="space-between">
            <h3 style={{ margin: 0 }}>
              {review.gameName || `Game ${review.game_id}`}
            </h3>
            <div className="small-muted">{review.rating}/10</div>
          </div>

          {editing === review.id ? (
            <>
              <textarea
                className="input"
                rows={4}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <input
                className="input"
                type="number"
                min="0"
                max="10"
                value={editRating}
                onChange={(e) => setEditRating(Number(e.target.value))}
              />
              <div style={{ marginTop: 8 }}>
                <button className="button" onClick={() => saveEdit(review.id)}>
                  Save
                </button>
                <button
                  className="button"
                  style={{ marginLeft: 8 }}
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p style={{ marginTop: 8 }}>{review.content}</p>
              <div style={{ marginTop: 10 }}>
                <button className="button" onClick={() => startEdit(review)}>
                  Edit
                </button>
                <button
                  className="button"
                  style={{ marginLeft: 8, background: "#ef4444" }}
                  onClick={() => deleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
