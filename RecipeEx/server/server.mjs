
import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import usersRouter from "./routes/users.mjs";
import recipesRouter from "./routes/recipes.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

// Use CORS to prevent CORS related browser issues.
app.use(cors());

// Increase to 10MB to handle larger, high-resolution images.
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Define the routes for users and recipes.
app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);

app.listen(5050, "0.0.0.0", () => {
  console.log("Server running on port 5050");
});