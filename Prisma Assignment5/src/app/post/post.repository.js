const prisma = require('../../common/db/prisma.js');

const createPostRepo = async (postData) => {
    return await prisma.post.create({ data: postData });
};

const findPostByIdRepo = async (postId) => {
    return await prisma.post.findUnique({
        where: { id: Number(postId) }
    });
};

const softDeletePostRepo = async (postId) => {
    return await prisma.post.update({
        where: { id: Number(postId) },
        data: { deletedAt: new Date() }
    });
};

const getPostsDetailsRepo = async () => {
    return await prisma.post.findMany({
        where: { deletedAt: null },
        select: {
            id: true,
            title: true,
            content: true,
            user: {
                select: { id: true, name: true }
            },
            comments: {
                select: { id: true, content: true }
            }
        }
    });
};

const getPostsWithCommentCountRepo = async () => {
    return await prisma.post.findMany({
        where: { deletedAt: null },
        include: {
            _count: {
                select: { comments: true }
            }
        }
    });
};

module.exports = {
    createPostRepo,
    findPostByIdRepo,
    softDeletePostRepo,
    getPostsDetailsRepo,
    getPostsWithCommentCountRepo
};