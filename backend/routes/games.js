import express from "express";
import axios from "axios";
const router = express.Router();

const CLIENT_ID = process.env.IGDB_CLIENT_ID;
const TOKEN = process.env.IGDB_ACCESS_TOKEN; 

// GET /games/search/:name
router.get("/search/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${TOKEN}`,
      },
      data: `search "${name}"; fields name,cover.url,summary,first_release_date,rating; limit 10;`,
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching games from IGDB" });
  }
});

export default router;
