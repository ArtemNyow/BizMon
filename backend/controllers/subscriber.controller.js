exports.subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    await Subscriber.create({ email });
    return res.status(201).json({ message: 'Subscribed successfully' });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ message: 'Already subscribed' });
    }

    console.error('❌ Subscribe error:', err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
