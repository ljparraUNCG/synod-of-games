import { pool } from "../db.js";

export const getReviewsByGameId = async (gameId) => {
  const result = await pool.query(
    "SELECT * FROM reviews WHERE game_id = $1 ORDER BY created_at DESC",
    [gameId]
  );
  return result.rows;
};

export const createReview = async (
  gameId,
  username,
  userId,
  content,
  rating
) => {
  const result = await pool.query(
    `INSERT INTO reviews (game_id, username, user_id, content, rating)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [gameId, username, userId, content, rating]
  );
  return result.rows[0];
};

export const getReviewsByUserId = async (userId) => {
  const result = await pool.query(
    "SELECT r.*, g.name AS gameName FROM reviews r JOIN games g ON r.game_id = g.id WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};
