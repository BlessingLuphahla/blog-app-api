const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json("User not found.");

    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  if (req.body?.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      req.body.password = hash;
    }
    try {
      const { username, ...body } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: body,
        },
        { new: true }
      );

      const { password, ...response } = updatedUser._doc;

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("Not Authorized.");
  }
};

const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) res.status(404).json("User not found.");

      await Post.deleteMany({ author: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("Not Authorized.");
  }
};

module.exports = { getUser, updateUser,deleteUser };
