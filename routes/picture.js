const router = require("express").Router();
const { getAllPics, postPic } = require("../controllers/picture");

// GET ALL PICS
router.get("/", getAllPics);

// Post a Pic
router.post("/", postPic);


module.exports = router;