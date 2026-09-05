function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkPasswordLength(password) {
    return password && password.length > 6;
}

function checkNameLength(name) {
    return name && name.length > 2;
}


function validateUserData(req, res, next) {
    const { name, email, password } = req.body;

    if (!checkNameLength(name)) {
        return res.status(400).json({ message: 'Name must be more than 2 characters long.' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!checkPasswordLength(password)) {
        return res.status(400).json({ message: 'Password must be more than 6 characters long.' });
    }

    next();
}

module.exports = {
    isValidEmail,
    checkPasswordLength,
    checkNameLength,
    validateUserData
};