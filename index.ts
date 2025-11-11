import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/auth.ts";
import userRoute from "./routes/user.ts";
import postRoute from "./routes/post.ts";
import catRoute from "./routes/category.ts";
import multer from "multer";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.use("/api/auth", router);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", catRoute);

app.listen(PORT, () => {
  console.log(`Backend is running on PORT ${PORT}`);
});
