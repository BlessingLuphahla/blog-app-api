const router = require("express").Router();
const {
  getPostById,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getSortedFew,
} = require("../controllers/post");

// GET BY ID
router.get("/find/:id", getPostById);

// GET ALL
router.get("/", getAllPosts);

// CREATE
router.post("/", createPost);

// UPDATE
router.put("/:id", updatePost);

// DELETE
router.delete("/:id", deletePost);

// GET SORTED 5 LATEST MOST LATEST POST
router.get("/top", getSortedFew);

module.exports = router;
