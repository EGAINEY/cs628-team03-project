import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";

const router = express.Router();

// POST /users/register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please provide username, email, and password." });
  }

  try {
    // Check if email already exists.
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hash the password before saving the user.
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword };

    const result = await db.collection("users").insertOne(newUser);
    res.status(201).json({ _id: result.insertedId, username, email });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /users/login - User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Find user by email.
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare provided password with hashed password in DB.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return user data (excluding password).
    res.json({ _id: user._id, username: user.username, email: user.email });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;