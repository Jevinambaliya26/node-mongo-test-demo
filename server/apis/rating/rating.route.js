const RatingController = require('./rating.controller');
var router = require("express").Router();
const APIResponse = require('../../helpers/APIResponse');
const httpStatus = require('http-status');
const Joi = require('joi');

// for add rating
router.post("/rate-post",addRatingValidate, RatingController.addRating);

router.get("/:id", RatingController.getRating);

const addRatingValidation = Joi.object().keys({
    post: Joi.string().required().error(new Error('Post id is required!')),
    user: Joi.string().required().error(new Error('User id is required!')),
    rating: Joi.number().required().error(new Error('Rating is required!'))
}).unknown();

function addRatingValidate(req, res, next) {
    const Data = req.body;
    Joi.validate((Data), addRatingValidation, (error, result) => {
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
        } else {
            return next();
        }
    });
}

module.exports = router;