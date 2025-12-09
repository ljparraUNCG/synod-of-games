import express from "express";
import { getReviews, postReview, getReviewsByUser } from "../controllers/reviewController.js";

const router = express.Router();

//GET reviews by game ID
router.get("/:gameId", getReviews);

//GET reviews by user ID
router.get("/user/:userId", getReviewsByUser);

//POST a new review
router.post("/", postReview);

export default router;
