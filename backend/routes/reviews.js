import express from "express";
import { getReviews, postReview } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/:gameId", getReviews);
router.post("/", postReview);

export default router;
