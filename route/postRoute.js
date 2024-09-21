const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createPost,
  getAllPosts,
  getPostById,
} = require("../controller/postController");
const authMiddleware = require("../middleware/authMiddleware");

// Set up storage untuk multer (upload beberapa gambar)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder untuk menyimpan gambar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nama file unik
  },
});

const upload = multer({ storage });

// Route untuk membuat artikel baru dengan beberapa gambar
router.post("/create", authMiddleware, upload.array("images", 5), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);

module.exports = router;
