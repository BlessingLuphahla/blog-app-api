const router = require("express").Router();
const { getCategory, createCategory } = require("../controllers/category");

// GET ALL
router.get("/", getCategory);

// CREATE
router.post("/", createCategory);

module.exports = router;
