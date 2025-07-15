const Mood = require('../models/Mood');

exports.createMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const userId = req.user.id;

    if (!mood) {
      return res.status(400).json({ message: 'Mood is required' });
    }

    const moodEntry = new Mood({
      userId,
      mood
    });

    await moodEntry.save();
    res.status(201).json({ message: 'Mood recorded successfully', moodEntry });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUserMoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const moods = await Mood.find({ userId }).sort({ createdAt: -1 }).limit(30); // Get last 30 moods
    res.status(200).json({ moods });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 