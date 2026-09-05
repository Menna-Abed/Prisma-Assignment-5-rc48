const { Router } = require('express');
const { signUp, upsertUser, getUserByEmail, getUserById } = require('./user.controller.js');

const { validateUserData, checkPasswordLength, checkNameLength } = require('../../utils/validators.js');

const router = Router();


router.post('/signup', validateUserData, checkPasswordLength, checkNameLength, signUp);
router.put('/:id', upsertUser);
router.get('/by-email', getUserByEmail);
router.get('/:id', getUserById);

module.exports = router;