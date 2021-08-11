"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

Schema.statics.getAvgRating = function (id) {
  return this.aggregate([
    {
      $match: {
        post: mongoose.Types.ObjectId(id)
      },
    },
    {
      $group: {
        _id: "$post",
        rating: {
          $avg: "$rating",
        },
      },
    },
  ]);
};

module.exports = mongoose.model("Rating", Schema);
