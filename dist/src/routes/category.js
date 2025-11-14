"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_js_1 = require("../../models/category.js");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const CategoryModel = category_js_1.Category;
const router = express_1.default.Router();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// CREATE NEW CATEGORIES
router.post("/create", async (req, res) => {
    const newCat = new CategoryModel(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get("/all", async (req, res) => {
    try {
        const category = await CategoryModel.find();
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
