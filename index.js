const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");
const pictureRoute = require("./routes/picture");

dotenv.config();
const cloudinary = require("./cloudinary");

const PORT = process.env.PORT || 4560;

app.use(express.json());
app.use(morgan("common"));
app.use(
  cors({
    origin: [
      process.env.LOCAL_URL,
      "https://blog-app-ui-plum.vercel.app",
      "https://its-travels.com",
      "https://www.its-travels.com",
    ],
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB."))
  .catch((error) => console.error(error));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/picture", pictureRoute);
app.use("/api/category", categoryRoute);

const upload = multer();

// Route for handling profile picture uploads
app.post(
  "/api/upload",
  upload.single("file"), // Use 'file' as the field name for the profile picture
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      const file = req.file;

      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      // Upload profile picture to Cloudinary
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "images",
        resource_type: "auto",
      });

      // Return the URL of the uploaded profile picture
      res.status(200).json({ url: result.secure_url });
    } catch (err) {
      console.error("Profile picture upload failed:", err);
      res
        .status(500)
        .json({ error: "Profile picture upload failed", details: err.message });
    }
  }
);

app.post(
  "/api/gallery",
  upload.single("file"), // Use 'file' as the field name for the profile picture
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      const file = req.file;

      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      // Upload profile picture to Cloudinary
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "gallery",
        resource_type: "auto",
      });

      // Return the URL of the uploaded profile picture
      res.status(200).json({ url: result.secure_url });
    } catch (err) {
      console.error("Profile picture upload failed:", err);
      res
        .status(500)
        .json({ error: "Profile picture upload failed", details: err.message });
    }
  }
);

app.listen(PORT, () => {
  console.log("Backend is running on ", PORT);
});
