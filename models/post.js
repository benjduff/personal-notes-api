const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    dateCreated: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    catagory: {
        type: Array,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

//save new blog post to db
module.exports.newPost = function(newPost, callback){
    newPost.save(callback);
}

//get all posts from collection
module.exports.getPosts = function(callback){
    Post.find({}, callback);
}

//find and delete specific post document
module.exports.deletePost = function(postId, callback){
    Post.findByIdAndDelete(postId, callback);
}

//find and update specific post document
module.exports.updatePost = function(postId, postData, callback){
    Post.findByIdAndUpdate(postId, {title: postData.title, catagory: postData.catagory, content: postData.content} ,callback);
}

//find specific post document
module.exports.getPostById = function(postId, callback){
    Post.findById(postId, callback);
}