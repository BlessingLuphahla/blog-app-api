const Category = require("../models/Category");

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createCategory = async (req, res) => {
  try {
    const foundCategory = await Category.findOne({ name: req.body.name });
    if (foundCategory) {
      return res
        .status(400)
        .json("Can not create category with the same name.");
    }

    const newCategory = new Category({ name: req.body.name });
    const category = await newCategory.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getCategory, createCategory };
