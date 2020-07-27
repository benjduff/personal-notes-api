const moment = require('moment');
const Post = require('../models/post');

//get list of posts to display on timeline and set query callback
exports.getPosts = function(req, res){
    Post.getPosts((err, posts) => {
        if(err || posts < 1){
            res.status(400).json({msg: 'There was an error getting the page content..  ERROR: ' + err});
        } else {
            res.status(200).json({posts: posts});
        }
    })
}

//create a new post for timeline and set query callback
exports.createPost = function(req, res){
    const newPost = new Post({
        dateCreated: moment().format('lll'),
        title: req.body.title,
        catagory: req.body.catagory,
        content: req.body.content
    });
    Post.newPost(newPost, (err) => {
        if(err){
            res.status(400).json({msg: 'Error: ' + err});
        } else {
            res.status(200).json({msg:'Post successful.'});
        }
    })
}

//allow admin to delete posts and set query callback
exports.deletePost = function(req, res){
    Post.deletePost(req.params.postId, (err, result) => {
        if(err) res.status(400).json({msg:'Error: ' + err});
        if(!result) {
            res.status(400).json({msg:'Post doesn\'t exist'});
        } else {
            res.status(200).json({msg:'Post deleted successfully'});
        }
    })
}

//Get specific post by Id and set query callback
exports.getPostById = function(req, res){
    Post.getPostById(req.params.postId, (err, post) => {
        if(err) res.status(400).json({msg:'Error: ' + err});
        if(!post){
            res.status(404).json({msg:'Post doesn\'t exist'});
        } else {
            res.status(200).json({post: post});
        }
    })
}

//update specific blog post and set query callback
exports.updatePost = function(req, res){
    const postData = {
        title: req.body.title,
        catagory: req.body.catagory,
        content: req.body.content
    }
    Post.updatePost(req.params.postId, postData, (err, result) => {
        if (err) res.status(400).json({msg:'Error: ' + err});
        if(!result) {
            res.status(404).json({msg:'Post doesn\'t exist'});
        } else {
            res.status(200).json({msg:'Post updated successfully'});
        }
    })
}