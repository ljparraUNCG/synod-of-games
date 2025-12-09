import bcrypt from "bcrypt";
import { createUser, getUserByUsername } from "../models/userModel.js";

// SIGNUP
export const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Incorrect password" });

    // Simple login: return user info
    res.json({ id: user.id, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};
