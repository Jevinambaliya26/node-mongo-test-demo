"use strict";

var config = require("./config");


exports.setup = function (app) {
    let post = require("./server/apis/post/post.route");
    let rating = require("./server/apis/rating/rating.route");
    app.use("/api/v1/post", post);
    app.use("/api/v1/rating", rating);
    
};

module.exports = exports;
