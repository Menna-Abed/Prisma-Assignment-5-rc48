const postRepo = require('./post.repository.js');

const createPostService = async (postData) => {
    return await postRepo.createPostRepo(postData);
};

const deletePostService = async (postId, userId) => {
    const post = await postRepo.findPostByIdRepo(postId);

    if (!post || post.deletedAt !== null) {
        throw new Error('Post not found');
    }

    if (post.userId !== Number(userId)) {
        throw new Error('You are not authorized to delete this post');
    }

    return await postRepo.softDeletePostRepo(postId);
};

const getPostsDetailsService = async () => {
    return await postRepo.getPostsDetailsRepo();
};

const getPostsWithCommentCountService = async () => {
    const posts = await postRepo.getPostsWithCommentCountRepo();
    return posts.map(post => ({
        id: post.id,
        title: post.title,
        commentCount: post._count.comments
    }));
};

module.exports = {
    createPostService,
    deletePostService,
    getPostsDetailsService,
    getPostsWithCommentCountService
};