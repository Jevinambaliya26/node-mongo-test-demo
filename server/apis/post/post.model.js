"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);

Schema.statics.getAll = function () {
  return this.find({ isActive: true })
    .populate("department", ["_id", "email"])
    .sort({ createdAt: -1 })
    .exec();
};

Schema.statics.findById = function (id) {
  return this.findOne({ _id: id, isActive: true });
};

Schema.statics.update = function (data) {
  return this.findOneAndUpdate(
    {
      _id: data._id,
    },
    {
      $set: data,
    },
    { new: true } // returns updated record
  );
};

Schema.statics.delete = function (id) {
  return this.deleteOne({
    _id: id,
  });
};

module.exports = mongoose.model("Post", Schema);
