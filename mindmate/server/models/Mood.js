const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'anxious', 'excited', 'calm', 'stressed', 'content', 'frustrated', 'grateful'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Mood', moodSchema); 