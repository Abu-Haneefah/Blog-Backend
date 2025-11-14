"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const post_js_1 = __importDefault(require("./routes/post.js"));
const category_js_1 = __importDefault(require("./routes/category.js"));
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// HEALTH CHECK ROUTE (Test the base URL: your-app-url.vercel.app/)
app.get("/", (req, res) => {
    res.status(200).send("Blog Backend API is running successfully.");
});
// TO CONNECT OUR DB
main().catch((err) => console.log(err));
async function main() {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error("MONGO_URL environment variable is not set");
        }
        await mongoose_1.default.connect(mongoUrl);
        console.log("Connected to the DB");
    }
    catch (err) {
        console.log("Error connecting to the DB", err);
    }
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, "req.body.name");
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});
// ROUTING MIDDLEWARE
app.use("/api/auth", auth_js_1.default);
app.use("/api/users", user_js_1.default);
app.use("/api/post", post_js_1.default);
app.use("/api/categories", category_js_1.default);
exports.default = app;
