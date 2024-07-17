const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const controller = require('../controllers/userController');

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);

router.put('/update-password', auth, controller.updateUserPassword);

router.get('/me', auth, controller.getCurrentUser);
router.put('/me', auth, controller.updateUser);

module.exports = router;
