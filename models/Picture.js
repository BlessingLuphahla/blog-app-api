const mongoose = require("mongoose");

const PictureSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Picture", PictureSchema);
