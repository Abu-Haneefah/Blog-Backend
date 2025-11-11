import express from "express";
import { User } from "../models/users.ts";
import { Post } from "../models/post.ts";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
const UsersModel = User;
const PostModel = Post;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// UPDATE USERS
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await UsersModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await UsersModel.findById(req.params.id);
      try {
        await PostModel.deleteMany({ username: user?.username });
        await UsersModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json(`User not found!" ${err}`);
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await UsersModel.findById(req.params.id).select("+password");
    if (!user || typeof user.password !== "string") {
      return res.status(400).json("Wrong credentials!");
    }
    const { password: _password, ...others } = user.toObject();
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
