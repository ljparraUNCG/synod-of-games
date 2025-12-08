import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET /reviews/:gameId
router.get("/:gameId", async (req, res) => {
  const { gameId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM reviews WHERE game_id = $1 ORDER BY created_at DESC",
      [gameId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

// POST /reviews
router.post("/", async (req, res) => {
  const { gameId, username, content, rating } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO reviews (game_id, username, content, rating)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [gameId, username, content, rating]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error posting review" });
  }
});

export default router;
