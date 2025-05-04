const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', authController.register);
router.post('/login', authController.login);


router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

module.exports = router;
