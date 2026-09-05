const postService = require('./post.service.js');

const createPost = async (req, res) => {
    try {
        const post = await postService.createPostService(req.body);
        res.status(201).json({ message: 'Post created successfully.', post });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        await postService.deletePostService(postId, userId);
        res.status(200).json({ message: 'Post deleted.' });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

const getPostsDetails = async (req, res) => {
    try {
        const posts = await postService.getPostsDetailsService();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostsCommentCount = async (req, res) => {
    try {
        const posts = await postService.getPostsWithCommentCountService();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    deletePost,
    getPostsDetails,
    getPostsCommentCount
};