// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviews from "./routes/reviews.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route so Render doesn't show "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Synod of Games backend is running!");
});

// Review routes
app.use("/reviews", reviews);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server running on port " + port));
