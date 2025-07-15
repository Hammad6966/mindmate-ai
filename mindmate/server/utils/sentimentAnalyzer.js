// Simple sentiment analyzer using keyword matching
const positiveWords = [
  'happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'fantastic', 'excellent',
  'good', 'positive', 'love', 'like', 'enjoy', 'pleased', 'satisfied', 'content',
  'grateful', 'blessed', 'fortunate', 'lucky', 'successful', 'achieved', 'accomplished',
  'proud', 'confident', 'optimistic', 'hopeful', 'inspired', 'motivated', 'energized'
];

const negativeWords = [
  'sad', 'angry', 'frustrated', 'disappointed', 'upset', 'worried', 'anxious',
  'stressed', 'depressed', 'lonely', 'afraid', 'scared', 'terrified', 'horrible',
  'terrible', 'awful', 'bad', 'negative', 'hate', 'dislike', 'annoyed', 'irritated',
  'exhausted', 'tired', 'overwhelmed', 'hopeless', 'helpless', 'defeated', 'lost'
];

function analyzeSentiment(text) {
  if (!text || typeof text !== 'string') {
    return { sentiment: 'neutral', score: 0, confidence: 0 };
  }

  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveCount++;
    }
    if (negativeWords.includes(word)) {
      negativeCount++;
    }
  });

  const totalWords = words.length;
  const positiveScore = positiveCount / totalWords;
  const negativeScore = negativeCount / totalWords;
  const netScore = positiveScore - negativeScore;

  let sentiment = 'neutral';
  let confidence = Math.abs(netScore);

  if (netScore > 0.05) {
    sentiment = 'positive';
  } else if (netScore < -0.05) {
    sentiment = 'negative';
  }

  return {
    sentiment,
    score: netScore,
    confidence: confidence,
    positiveWords: positiveCount,
    negativeWords: negativeCount,
    totalWords
  };
}

module.exports = { analyzeSentiment }; 