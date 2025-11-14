"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_js_1 = require("../models/users.js");
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = (0, express_1.default)();
const UsersModel = users_js_1.User;
const router = express_1.default.Router();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// REGISTER USERS
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, salt);
        const newUser = new UsersModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
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
        const validated = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validated) {
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
