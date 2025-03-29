const Picture = require("../models/Picture");

const getAllPics = async (req, res) => {
  try {
    const pics = await Picture.find();
    res.status(200).json(pics);
  } catch (error) {
    res.status(500).json(error);
  }
};

const postPic = async (req, res) => {
  try {
    const newPic = new Picture(req.body);
    const pic = await newPic.save();

    res.status(201).json(pic);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getAllPics, postPic };
