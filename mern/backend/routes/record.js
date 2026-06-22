import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/* =========================
   GET ALL RECORDS
========================= */
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).send(err.message);
  }
});

/* =========================
   GET BY ID
========================= */
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (err) {
    console.error("GET BY ID ERROR:", err);
    res.status(500).send(err.message);
  }
});

/* =========================
   CREATE RECORD (MAIN ISSUE AREA)
========================= */
router.post("/", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body); // 👈 DEBUG IMPORTANT

    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    const collection = db.collection("records");
    const result = await collection.insertOne(newDocument);

    console.log("INSERT RESULT:", result); // 👈 DEBUG IMPORTANT

    res.status(201).send(result);
  } catch (err) {
    console.error("INSERT ERROR:", err); // 👈 REAL ERROR HERE
    res.status(500).send(err.message);
  }
});

/* =========================
   UPDATE
========================= */
router.patch("/:id", async (req, res) => {
  try {
    const collection = db.collection("records");

    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).send(err.message);
  }
});

/* =========================
   DELETE
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("records");

    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
      console.error("🔥 INSERT ERROR:", err);
      res.status(500).send(err.message);
  }
});

export default router;