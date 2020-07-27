const express = require('express');
const postController = require('../controllers/posts');
const router = express.Router();
const checkAuth = require('../middleware/checkauth');

//get all blog posts
router.get('/', postController.getPosts);

//create a new blog post
router.post('/createpost', checkAuth.checkToken, postController.createPost);

//delete specific blog post by postId
router.delete('/delpost/:postId', checkAuth.checkToken, postController.deletePost);

//get specific blog post by postId
router.get('/getpost/:postId', checkAuth.checkToken, postController.getPostById);

//update specific blog post by postId
router.post('/editpost/:postId', checkAuth.checkToken, postController.updatePost);

module.exports = router;