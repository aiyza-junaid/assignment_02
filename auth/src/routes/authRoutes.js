const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);

module.exports = router;
