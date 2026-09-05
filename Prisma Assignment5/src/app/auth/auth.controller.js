const authService = require('./auth.service.js');

async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const createdUser = await authService.register(name, email, password);
        res.status(201).json({
            message: "user created successfully",
            success: true,
            data: createdUser
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        res.json({
            message: "user logged in successfully",
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login };