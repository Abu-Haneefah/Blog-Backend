"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_js_1 = require("../../models/users.js");
const post_js_1 = require("../../models/post.js");
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
const UsersModel = users_js_1.User;
const PostModel = post_js_1.Post;
const router = express_1.default.Router();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// UPDATE USERS
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt_1.default.genSalt(10);
            req.body.password = await bcrypt_1.default.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await UsersModel.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(updatedUser);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
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
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
        catch (err) {
            res.status(404).json(`User not found!" ${err}`);
        }
    }
    else {
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
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
