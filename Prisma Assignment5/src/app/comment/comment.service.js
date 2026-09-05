const commentRepo = require('./comment.repository.js');

const createBulkCommentsService = async (comments) => {
    await commentRepo.createBulkCommentsRepo(comments);
    return { message: "comments created." };
};

const updateCommentService = async (commentId, userId, content) => {
    const comment = await commentRepo.findCommentByIdRepo(commentId);

    if (!comment) {
        throw { status: 404, message: "comment not found." };
    }

    if (comment.userId !== Number(userId)) {
        throw { status: 403, message: "You are not authorized to update this comment." };
    }

    await commentRepo.updateCommentRepo(commentId, content);
    return { message: "Comment updated." };
};

const findOrCreateCommentService = async ({ postId, userId, content }) => {
    const existingComment = await commentRepo.findExistingCommentRepo(postId, userId, content);

    if (existingComment) {
        return { comment: existingComment, created: false };
    }

    const newComment = await commentRepo.createSingleCommentRepo(postId, userId, content);
    return { comment: newComment, created: true };
};

const searchCommentsService = async (word) => {
    const comments = await commentRepo.searchCommentsRepo(word);

    if (comments.length === 0) {
        throw { status: 404, message: "no comments found." };
    }

    return {
        count: comments.length,
        comments
    };
};

const getNewestCommentsService = async (postId) => {
    return await commentRepo.getNewestCommentsRepo(postId);
};

const getCommentDetailsService = async (id) => {
    const comment = await commentRepo.getCommentDetailsRepo(id);

    if (!comment) {
        throw { status: 404, message: "no comment found" };
    }

    return comment;
};

module.exports = {
    createBulkCommentsService,
    updateCommentService,
    findOrCreateCommentService,
    searchCommentsService,
    getNewestCommentsService,
    getCommentDetailsService
};