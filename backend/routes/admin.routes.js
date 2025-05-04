const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const User = require('../models/User');
const Contact = require('../models/ContactMessage');
const Subscriber = require('../models/Subscriber');


router.get('/dashboard-data', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const users = await User.find();
    const contacts = await Contact.find();
    const subscribers = await Subscriber.find();

    res.json({ users, contacts, subscribers });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/dashboard', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }

  try {
    const users = await User.find();
    const contacts = await Contact.find();
    const subscribers = await Subscriber.find();

    res.render('pages/admin/dashboard', {
      users,
      contacts,
      subscribers
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
