// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviews from "./routes/reviews.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/reviews", reviews);

// Simple route to hit IGDB external API
app.get("/games/:name", async (req, res) => {
  res.json({
    message: "This is where IGDB data will go.",
    game: req.params.name,
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Backend running on port", port));
