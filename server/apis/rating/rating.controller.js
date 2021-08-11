"use strict";

const Rating = require("./rating.model");
const httpStatus = require("http-status");
const APIResponse = require("../../helpers/APIResponse");

class RatingController {
  //add rating
  async addRating(req, res) {
    try {
      let model = new Rating(req.body);

      let response = await model.save();
      response = {
        ...JSON.parse(JSON.stringify(response)),
      };
      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(response, "Rating added successfully", httpStatus.OK)
        );
    } catch (error) {
      console.log(error);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error in Rate Post",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }

  //Get rating
  async getRating(req, res) {
    let postId = req.params.id;
    try {
      let response = await Rating.getAvgRating(postId);
      console.log(response);
      response = {
        rating: response[0] ? response[0].rating : 0,
      };
      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(
            response,
            "Avg. Rating get successfully.",
            httpStatus.OK
          )
        );
    } catch (error) {
      console.log(error);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error in get rating.",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }
}

module.exports = new RatingController();
