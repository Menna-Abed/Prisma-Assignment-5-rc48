const { config } = require('dotenv');
config();

const express = require('express');
const app = express();

app.use(express.json());


const userRouter = require('./app/user/user.route.js');
const postRouter = require('./app/post/post.route.js');
const commentRouter = require('./app/comment/comment.route.js');


app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);


app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message || 'Internal Server Error',
        success: false
    });
});


app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});