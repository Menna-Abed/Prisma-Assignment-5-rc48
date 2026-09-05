const prisma = require('../../common/db/prisma.js');

const createBulkCommentsRepo = async (comments) => {
    return await prisma.comment.createMany({ data: comments });
};

const findCommentByIdRepo = async (commentId) => {
    return await prisma.comment.findUnique({
        where: { id: Number(commentId) }
    });
};

const updateCommentRepo = async (commentId, content) => {
    return await prisma.comment.update({
        where: { id: Number(commentId) },
        data: { content }
    });
};

const findExistingCommentRepo = async (postId, userId, content) => {
    return await prisma.comment.findFirst({
        where: {
            postId: Number(postId),
            userId: Number(userId),
            content: content
        }
    });
};

const createSingleCommentRepo = async (postId, userId, content) => {
    return await prisma.comment.create({
        data: {
            postId: Number(postId),
            userId: Number(userId),
            content: content
        }
    });
};

const searchCommentsRepo = async (word) => {
    return await prisma.comment.findMany({
        where: {
            content: {
                contains: word,
                mode: 'insensitive'
            }
        }
    });
};

const getNewestCommentsRepo = async (postId) => {
    return await prisma.comment.findMany({
        where: { postId: Number(postId) },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: {
            id: true,
            content: true,
            createdAt: true
        }
    });
};

const getCommentDetailsRepo = async (id) => {
    return await prisma.comment.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            content: true,
            user: {
                select: { id: true, name: true, email: true }
            },
            post: {
                select: { id: true, title: true, content: true }
            }
        }
    });
};

module.exports = {
    createBulkCommentsRepo,
    findCommentByIdRepo,
    updateCommentRepo,
    findExistingCommentRepo,
    createSingleCommentRepo,
    searchCommentsRepo,
    getNewestCommentsRepo,
    getCommentDetailsRepo
};