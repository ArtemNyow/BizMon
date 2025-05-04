const Subscriber = require('../models/Subscriber');

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Already subscribed' });

    await Subscriber.create({ email });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
