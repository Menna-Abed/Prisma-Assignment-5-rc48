const commentService = require('./comment.service.js');

const createBulkComments = async (req, res) => {
    try {
        const { comments } = req.body;
        const result = await commentService.createBulkCommentsService(comments);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId, content } = req.body;
        const result = await commentService.updateCommentService(commentId, userId, content);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const findOrCreateComment = async (req, res) => {
    try {
        const result = await commentService.findOrCreateCommentService(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchComments = async (req, res) => {
    try {
        const { word } = req.query;
        const result = await commentService.searchCommentsService(word);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

const getNewestComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await commentService.getNewestCommentsService(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCommentDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await commentService.getCommentDetailsService(id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    createBulkComments,
    updateComment,
    findOrCreateComment,
    searchComments,
    getNewestComments,
    getCommentDetails
};