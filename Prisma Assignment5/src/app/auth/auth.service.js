const authRepository = require('./auth.repository.js');
const { isValidEmail } = require('../../utils/validators.js');

async function register(name, email, password) {

    if (!isValidEmail(email)) {
        const error = new Error('Invalid email format');
        error.statusCode = 400;
        throw error;
    }


    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
        const error = new Error('Email already exists');
        error.statusCode = 400;
        throw error;
    }

    return await authRepository.createUser({ name, email, password });
}

async function login(email, password) {
    if (!isValidEmail(email)) {
        const error = new Error('Invalid email format');
        error.statusCode = 400;
        throw error;
    }

    const user = await authRepository.findUserByEmail(email);
    if (!user || user.password !== password) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }
    return user;
}

module.exports = { register, login };