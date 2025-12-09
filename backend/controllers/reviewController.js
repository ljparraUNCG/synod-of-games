import { getReviewsByGameId, createReview } from "../models/reviewModel.js";

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
