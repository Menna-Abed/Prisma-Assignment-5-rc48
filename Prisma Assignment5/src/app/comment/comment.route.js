const { Router } = require('express');
const {
    createBulkComments,
    updateComment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails
} = require('./comment.controller.js');

const router = Router();

 
router.post('/', createBulkComments);
router.post('/find-or-create', findOrCreateComment);
router.get('/search', searchComments);
router.get('/newest/:postId', getNewestComments);
router.get('/details/:id', getCommentDetails);

 
router.patch('/:commentId', updateComment);

module.exports = router;
