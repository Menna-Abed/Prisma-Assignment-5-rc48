const prisma = require('../../common/db/prisma.js');

const createUserRepo = async (userData) => {
    return await prisma.user.create({ data: userData });
};

const findUserByEmailRepo = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
};

const upsertUserRepo = async (id, userData) => {
    const userId = Number(id);
    return await prisma.user.upsert({
        where: { id: userId },
        update: userData,
        create: { id: userId, ...userData }
    });
};

const getUserByIdRepo = async (id) => {
    return await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

module.exports = {
    createUserRepo,
    findUserByEmailRepo,
    upsertUserRepo,
    getUserByIdRepo
};