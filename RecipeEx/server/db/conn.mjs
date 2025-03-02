// db/conn.mjs
import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
let db;

try {
  conn = await client.connect();

  // Ensure db is properly assigned.
  db = conn.db("RecipeExDb");
  console.log("Successfully connected to MongoDB.");

} catch (e) {
  console.error("Failed to connect to MongoDB:", e);
  // Exit process if connection fails
  process.exit(1);
}

export default db;