const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sentiment: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    default: 'neutral',
  },
}, { timestamps: true });

module.exports = mongoose.model('JournalEntry', journalEntrySchema); 