import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be FIRST

import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/record", records);

// test route (recommended)
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running 🚀",
    mongo: process.env.MONGO_URL
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("Mongo URL:", process.env.MONGO_URL);
});