const JournalEntry = require('../models/JournalEntry');

exports.createJournal = async (req, res) => {
  try {
    const { title, content, sentiment } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const journalEntry = new JournalEntry({
      title,
      content,
      userId,
      sentiment: sentiment || 'neutral'
    });

    await journalEntry.save();
    res.status(201).json({ message: 'Journal entry created successfully', journalEntry });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUserJournals = async (req, res) => {
  try {
    const userId = req.user.id;
    const journals = await JournalEntry.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ journals });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 