"use strict";

const Post = require("./post.model");
const httpStatus = require('http-status');
const APIResponse = require('../../helpers/APIResponse');

class PostController {
    //create post
    async createPost(req, res) {
        try {
            let model = new Post(req.body);

            let response = await model.save();
            response = {
                ...JSON.parse(JSON.stringify(response))
            }
            return res.status(httpStatus.OK).json(new APIResponse(response, 'Post Created successfully', httpStatus.OK));
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse({}, 'Error in Creating Post', httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }

      //update post 
      async update(req, res, next) {
        let body = req.body;
        try {
            const response = await Post.update(body);
            if (response) {
                return res.status(httpStatus.OK).json(new APIResponse(response, 'Post updated successfully', httpStatus.OK));
            }
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse({}, 'Post with the specified ID does not exists', httpStatus.BAD_REQUEST));

        } catch (e) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(new APIResponse(null, 'Error updating post', httpStatus.INTERNAL_SERVER_ERROR, e));
        }
    }

     //delete user by id
     async delete(req, res) {
        let postId = req.params.id;
        try {
            let response = await Post.delete(postId);
            if (response) {
                return res.status(httpStatus.OK).json(new APIResponse({}, 'Post deleted successfully', httpStatus.OK));
            }
            return res.status(httpStatus.BAD_REQUEST).json(new APIResponse({}, 'Post with the specified ID does not exists', httpStatus.BAD_REQUEST));

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(new APIResponse(null, 'Error deleting Post', httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }

   
}

module.exports = new PostController();