const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    text: {
      type: String,
      required: "Text is required",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: "Rating is required",
    },
    movie: {
      type: Number,
      required: true,
      index: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", schema);
module.exports = Comment;
