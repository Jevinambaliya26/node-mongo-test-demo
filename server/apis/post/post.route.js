const PostController = require('./post.controller');
var router = require("express").Router();
const APIResponse = require('../../helpers/APIResponse');
const httpStatus = require('http-status');
const Joi = require('joi');

// for create post
router.post("/",createPostValidate, PostController.createPost);

// for update post
router.put("/", updatePostValidate, PostController.update);

// delete post by ID 
router.delete("/:id", IDparamRequiredValidation, PostController.delete);


const createPostValidation = Joi.object().keys({
    text: Joi.string().required().error(new Error('text is required!')),
}).unknown();


const updateValidation = Joi.object().keys({
    _id: Joi.string().required().error(new Error('_id is required!')),
    text: Joi.string().required().error(new Error('text is required!'))
}).unknown();


function IDparamRequiredValidation(req, res, next) {
    if (req.params && req.params.hasOwnProperty('id')) {
        next();
    } else {
        return res.status(httpStatus.BAD_REQUEST)
            .json(new APIResponse(null, 'id param not found', httpStatus.BAD_REQUEST));
    }
}

function createPostValidate(req, res, next) {
    const Data = req.body;
    Joi.validate((Data), createPostValidation, (error, result) => {
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
        } else {
            return next();
        }
    });
}


function updatePostValidate(req, res, next) {
    const Data = req.body;
    Joi.validate((Data), updateValidation, (error, result) => {
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
        } else {
            return next();
        }
    });
}

module.exports = router;