const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessions');

//validate user session route
router.get('/session/:token', sessionController.validateSession);

module.exports = router;