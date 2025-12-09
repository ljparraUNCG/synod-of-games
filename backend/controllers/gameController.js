import axios from "axios";

const IGDB_HEADERS = {
  "Client-ID": process.env.IGDB_CLIENT_ID,
  Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
};

export const searchGames = async (req, res) => {
  const { name } = req.params;
  try {
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: IGDB_HEADERS,
      data: `search "${name}"; fields name,cover.url,summary; limit 10;`,
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Error fetching games from IGDB" });
  }
};

export const getGameDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: IGDB_HEADERS,
      data: `fields name,cover.url,summary,first_release_date,rating; where id = ${id};`,
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Error fetching game details" });
  }
};

export const getAllGames = async (req, res) => {
  try {
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: IGDB_HEADERS,
      data: `fields name,cover.url,summary; limit 50;`,
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Error fetching games from IGDB" });
  }
};
