
import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import usersRouter from "./routes/users.mjs";
import recipesRouter from "./routes/recipes.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

// Use CORS to prevent CORS related browser issues.
app.use(cors());
app.use(express.json());

// Define the routes for users and recipes.
app.use("/users", usersRouter);
app.use("/recipes", recipesRouter);

app.listen(5050, "0.0.0.0", () => {
  console.log("Server running on port 5050");
});
