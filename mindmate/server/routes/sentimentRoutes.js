const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const { analyzeSentiment } = require('../utils/sentimentAnalyzer');

// Apply auth middleware to sentiment routes
router.use(authMiddleware);

// POST /api/sentiment - Analyze sentiment of journal text (FREE local analysis)
router.post('/api/sentiment', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required for sentiment analysis' });
    }

    // Use local sentiment analyzer (FREE)
    const sentimentResult = analyzeSentiment(text);

    res.json({ 
      sentiment: sentimentResult.sentiment,
      score: sentimentResult.score,
      confidence: sentimentResult.confidence,
      details: {
        positiveWords: sentimentResult.positiveWords,
        negativeWords: sentimentResult.negativeWords,
        totalWords: sentimentResult.totalWords
      }
    });

  } catch (error) {
    console.error('Sentiment Analysis Error:', error.message);
    res.status(500).json({ error: 'Failed to analyze sentiment' });
  }
});

module.exports = router; 