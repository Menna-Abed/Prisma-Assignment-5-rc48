const userRepo = require('./user.repository.js');

const registerUser = async (data) => {

    const existingUser = await userRepo.findUserByEmailRepo(data.email);
    if (existingUser) {
        throw new Error('Email is already exists.');
    }
    return await userRepo.createUserRepo(data);
};

const upsertUserService = async (id, data) => {
    return await userRepo.upsertUserRepo(id, data);
};

const findUserByEmailService = async (email) => {
    return await userRepo.findUserByEmailRepo(email);
};

const getUserByIdService = async (id) => {
    return await userRepo.getUserByIdRepo(id);
};

module.exports = {
    registerUser,
    upsertUserService,
    findUserByEmailService,
    getUserByIdService
};