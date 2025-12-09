import express from "express";
import { searchGames, getGameDetails } from "../controllers/gameController.js";

const router = express.Router();

router.get("/search/:name", searchGames);
router.get("/details/:id", getGameDetails);

export default router;
