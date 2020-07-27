const express = require('express');
// const auth = require('../middleware/checkauth');
const userController = require('../controllers/users');
const router = express.Router();

//register new user
router.post('/register', userController.validateUsername, userController.validateEmail, userController.register);

//admin login
router.post('/login', userController.login);
module.exports = router;