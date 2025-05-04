const ContactMessage = require('../models/ContactMessage');

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await ContactMessage.create({ name, email, message });
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
