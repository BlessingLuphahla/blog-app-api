const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/auth");

console.log(String(registerUser));
console.log(loginUser);

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

module.exports = router;
