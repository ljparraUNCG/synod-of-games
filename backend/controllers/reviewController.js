import { getReviewsByGameId, createReview, getReviewsByUserId } from "../models/reviewModel.js";

export const getReviews = async (req, res) => {
  const { gameId } = req.params;
  try {
    const reviews = await getReviewsByGameId(gameId);
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching reviews" });
  }
};

export const postReview = async (req, res) => {
  const { gameId, username, content, rating, userId } = req.body;
  try {
    const review = await createReview(
      gameId,
      username,
      userId,
      content,
      rating
    );
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error posting review" });
  }
};

export const getReviewsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const reviews = await getReviewsByUserId(userId);
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching reviews for user" });
  }
};

