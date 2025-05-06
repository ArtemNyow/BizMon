const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// ====== Стандартна автентифікація ======
router.post('/register', authController.register);
router.post('/verify-registration', authController.verifyRegistration);

router.post('/login', authController.login);
router.post('/verify-login', authController.verify2FA);

router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

// ====== Google OAuth ======

// 🔐 Редирект на Google з обов'язковим `scope`
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account', // змушує обрати акаунт
    session: false
  })
);

// ✅ Callback обробник після авторизації
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const name = encodeURIComponent(user.name || '');
    const avatar = encodeURIComponent(user.avatar || '');
    const redirectUrl = `${process.env.CLIENT_URL}/?token=${token}&name=${name}&avatar=${avatar}`;

    return res.redirect(redirectUrl);
  }
);

// (опціонально, не обов’язково)
router.get('/google/success', (req, res) => {
  res.render('partials/success');
});

module.exports = router;
