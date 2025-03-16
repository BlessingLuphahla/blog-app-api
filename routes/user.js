const router = require("express").Router();
const { getUser, updateUser, deleteUser } = require("../controllers/user");

// GET USER BY ID
router.get("/:id", getUser);

// UPDATE
router.put("/:id", updateUser);

// DELETE
router.delete("/:id", deleteUser);

module.exports = router;
