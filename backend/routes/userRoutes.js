const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPassword } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:resetToken', resetPassword);

module.exports = router;
