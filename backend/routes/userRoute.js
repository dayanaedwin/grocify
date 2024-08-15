const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const controller = require('../controllers/userController');

router.get('/me', auth, controller.getCurrentUser);
router.put('/me', auth, controller.updateUser);

router.put('/update-password', auth, controller.updateUserPassword);

module.exports = router;
