const express = require('express');
const User = require('../models/User');
const Subscriber = require('../models/Subscriber');
const ContactMessage = require('../models/ContactMessage');

const router = express.Router();

// --- USERS ---
router.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body); // не забувай хешувати пароль у моделі!
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

router.delete('/users/:id', async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  res.json({ success: !!result });
});

router.get('/subscribers/:id', async (req, res) => {
  const sub = await Subscriber.findById(req.params.id);
  if (!sub) return res.status(404).send('Subscriber not found');
  res.json(sub);
});

router.post('/subscribers', async (req, res) => {
  try {
    const sub = await Subscriber.create(req.body);
    res.status(201).json(sub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/subscribers/:id', async (req, res) => {
  const sub = await Subscriber.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(sub);
});

router.delete('/subscribers/:id', async (req, res) => {
  const result = await Subscriber.findByIdAndDelete(req.params.id);
  res.json({ success: !!result });
});


router.get('/contacts/:id', async (req, res) => {
  const contact = await ContactMessage.findById(req.params.id);
  if (!contact) return res.status(404).send('Contact not found');
  res.json(contact);
});

router.post('/contacts', async (req, res) => {
  try {
    const contact = await ContactMessage.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/contacts/:id', async (req, res) => {
  const contact = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(contact);
});

router.delete('/contacts/:id', async (req, res) => {
  const result = await ContactMessage.findByIdAndDelete(req.params.id);
  res.json({ success: !!result });
});

module.exports = router;
