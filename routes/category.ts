import express from "express";
import { Category } from "../models/category.ts";

import bodyParser from "body-parser";

const app = express();

const CategoryModel = Category;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CREATE NEW CATEGORIES
router.post("/create", async (req, res) => {
  const newCat = new CategoryModel(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all", async (req, res) => {
  try {
    const category = await CategoryModel.find();
    // if (!category || typeof category !== "string") {
    //   return res.status(400).json("Wrong credentials!");
    // }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
