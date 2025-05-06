const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Звичайна реєстрація/логін
router.post('/register', authController.register);
router.post('/login', authController.login);

// Авторизований запит
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

// ==== GOOGLE AUTH ====
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Успішна авторизація
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/'
  }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

   
    const redirectUrl = `/api/auth/google/success?token=${token}&name=${encodeURIComponent(req.user.name)}&avatar=${encodeURIComponent(req.user.avatar || '')}&role=${req.user.role}`;
    res.redirect(redirectUrl);
  }
);

router.get('/google/success', (req, res) => {
  res.render('partials/success');
});

module.exports = router;
