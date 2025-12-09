import express from "express";
import { searchGames, getGameDetails, getAllGames } from "../controllers/gameController.js";

const router = express.Router();

router.get("/search/:name", searchGames);
router.get("/details/:id", getGameDetails);
router.get("/", getAllGames);



export default router;
