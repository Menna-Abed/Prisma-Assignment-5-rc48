const { Router } = require('express');
const { createPost, deletePost, getPostsDetails, getPostsCommentCount } = require('./post.controller.js');

const router = Router();

router.post('/', createPost);
router.delete('/:postId', deletePost);
router.get('/details', getPostsDetails);
router.get('/comment-count', getPostsCommentCount);

module.exports = router;