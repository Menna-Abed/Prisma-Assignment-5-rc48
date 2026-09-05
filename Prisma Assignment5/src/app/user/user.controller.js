const userService = require('./user.service.js');

const signUp = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({ message: 'User added successfully.', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const upsertUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.upsertUserService(id, req.body);
        res.status(200).json({ message: 'User created or updated successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await userService.findUserByEmailService(email);
        if (!user) return res.status(404).json({ message: 'no user found' });
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserByIdService(id);
        if (!user) return res.status(404).json({ message: 'no user found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    signUp,
    upsertUser,
    getUserByEmail,
    getUserById
};