import express from "express";
import { User } from "../models/users.ts";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
const UsersModel = User;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// REGISTER USERS
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new UsersModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN USERS
router.post("/login", async (req, res) => {
  try {
    const user = await UsersModel.findOne({
      username: req.body.username,
    }).select("+password");
    if (!user || typeof user.password !== "string") {
      return res.status(400).json("Wrong credentials!");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("Wrong credentials!");
    }

    const { password: _password, ...others } = user.toObject();

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
