
// backend/routes/reviews.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET reviews for a game
router.get("/:gameId", async (req, res) => {
  const { gameId } = req.params;
  const result = await pool.query(
    "SELECT * FROM reviews WHERE game_id = $1",
    [gameId]
  );
  res.json(result.rows);
});

// POST create a review
router.post("/", async (req, res) => {
  const { gameId, username, content } = req.body;

  const result = await pool.query(
    "INSERT INTO reviews (game_id, username, content) VALUES ($1, $2, $3) RETURNING *",
    [gameId, username, content]
  );

  res.json(result.rows[0]);
});

export default router;
