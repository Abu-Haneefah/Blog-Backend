const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const catRoute = require("./routes/category");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
    await mongoose.connect(mongoUrl);
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Error connecting to the DB", err);
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "req.body.name");
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
// ROUTING MIDDLEWARE
app.use("/api/auth", router);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", catRoute);

module.exports = app;
