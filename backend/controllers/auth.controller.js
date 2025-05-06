const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../config/mailer');

// Email regex для базової перевірки
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// === Реєстрація з перевіркою коду ===
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters long, contain an uppercase letter and a digit'
    });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    global.tempRegistrations = global.tempRegistrations || {};
    global.tempRegistrations[email] = { name, password: hash, code, expires };

    await sendEmail.sendVerificationCode(email, code);
    return res.status(202).json({ message: 'Verification code sent', email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// === Підтвердження коду реєстрації ===
exports.verifyRegistration = async (req, res) => {
  const { email, code } = req.body;
  const entry = global.tempRegistrations?.[email];

  if (!entry || entry.code !== code || entry.expires < new Date()) {
    return res.status(400).json({ message: 'Invalid or expired code' });
  }

  try {
    const newUser = await User.create({
      name: entry.name,
      email,
      password: entry.password,
      role: 'user'
    });

    delete global.tempRegistrations[email];

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET || 'secret');
    res.status(201).json({ token, name: newUser.name, role: newUser.role, avatar: newUser.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// === Логін з 2FA ===
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.verificationCode = code;
    user.codeExpires = codeExpires;
    await user.save();

    await sendEmail.sendVerificationCode(user.email, code);
    return res.status(202).json({ message: 'Verification code sent', need2FA: true, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// === Перевірка коду логіну ===
exports.verify2FA = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== code || user.codeExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    user.verificationCode = null;
    user.codeExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret');
    res.json({ token, name: user.name, role: user.role, avatar: user.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
