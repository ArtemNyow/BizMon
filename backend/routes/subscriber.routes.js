const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');


router.get('/', async (req, res) => {
  try {
    const subs = await Subscriber.find();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const sub = await Subscriber.findById(req.params.id);
    if (!sub) return res.status(404).send('Subscriber not found');
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const sub = await Subscriber.create(req.body);
    res.status(201).json(sub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Subscriber.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ success: !!result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
