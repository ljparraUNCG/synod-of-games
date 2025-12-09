import { pool } from "../db.js";

export const getGamesFromDB = async () => {
  const result = await pool.query("SELECT * FROM games ORDER BY name ASC");
  return result.rows;
};
