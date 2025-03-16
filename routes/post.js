const router = require("express").Router();
const {
  getPostById,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");

// GET BY ID
router.get("/:id", getPostById);

// GET ALL
router.get("/", getAllPosts);

// CREATE
router.post("/", createPost);

// UPDATE
router.put("/:id", updatePost);

// DELETE
router.delete("/:id", deletePost);

module.exports = router;
