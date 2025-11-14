"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_js_1 = require("../models/post.js");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
// const UsersModel = User;
const PostModel = post_js_1.Post;
const router = express_1.default.Router();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// CREATE NEW POST
router.post("/create", async (req, res) => {
    const newPost = new PostModel(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post?.username === req.body.username) {
            try {
                const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatedPost);
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json("You can only update your post!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post?.username === req.body.username) {
            try {
                await PostModel.findByIdAndDelete(req.params.id);
                res.status(200).json("Post successfully deleted...");
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json("You can only update your post!");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
// GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await PostModel.find({
                username,
            });
        }
        else if (catName) {
            posts = await PostModel.find({
                categories: {
                    $in: [catName],
                },
            });
        }
        else {
            posts = await PostModel.find();
        }
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
