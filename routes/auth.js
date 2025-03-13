const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch(error) {
        res.status(500).json(error);
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json('Wrong credentials.');

        const matched = await bcrypt.compare(req.body.password, user.password);
        if (!matched) return res.status(400).json('Wrong credentials.');

        const {password, ...other} = user._doc;

        res.status(200).json(other);
    } catch(error) {
        res.status(500).json(error);
    }
})


module.exports = router;