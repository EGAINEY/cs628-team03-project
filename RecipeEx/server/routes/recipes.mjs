import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();

// Get all recipes or filter by user ID.
router.get("/", async (req, res) => {
  const query = req.query.createdBy ? { createdBy: new ObjectId(req.query.createdBy) } : {};

  try {
    const recipes = await db.collection("recipes").find(query).toArray();
    res.json(recipes);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single recipe by ID.
router.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid recipe ID format" });
  }

  try {
    const recipe = await db.collection("recipes").findOne({ _id: new ObjectId(req.params.id) });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new recipe.
router.post("/", async (req, res) => {
  const { title, ingredients, instructions, createdBy, image } = req.body;

  if (!title || !ingredients || !instructions || !createdBy) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const newRecipe = {
      title,
      ingredients,
      instructions,
      createdBy: new ObjectId(createdBy),
      image: image || null,
    };

    const result = await db.collection("recipes").insertOne(newRecipe);
    res.status(201).json({ _id: result.insertedId, ...newRecipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing recipe.
router.patch("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid recipe ID format" });
  }

  const updates = { $set: req.body };

  try {
    const result = await db.collection("recipes").updateOne(
      { _id: new ObjectId(req.params.id) },
      updates
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ message: "Recipe updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a recipe.
router.delete("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid recipe ID format" });
  }

  try {
    const result = await db.collection("recipes").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;