const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// router.get('/me', auth, userController.getCurrentUser);
// router.put('/me', auth, userController.updateUser);
// router.delete('/me', auth, userController.deleteUser);

module.exports = router;
