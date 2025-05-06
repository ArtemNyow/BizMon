const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', authController.register);
router.post('/verify-registration', authController.verifyRegistration);

router.post('/login', authController.login);
router.post('/verify-login', authController.verify2FA);

router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    const name = encodeURIComponent(user.name || '');
    const avatar = encodeURIComponent(user.avatar || '');
    const redirectUrl = `${process.env.CLIENT_URL}/?token=${token}&name=${name}&avatar=${avatar}`;

    res.redirect(redirectUrl);
  }
);


router.get('/google/success', (req, res) => {
  res.render('partials/success');
});

module.exports = router;
