import React from 'react';
import { motion } from 'framer-motion';

// Helper to format date as 'July 13, 2025'
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Mood emoji badge
const moodEmoji = {
  happy: '😊',
  neutral: '😐',
  sad: '😢',
  anxious: '😰',
  angry: '😠',
};

// Sentiment badge with animated color
const SentimentBadge = ({ sentiment }) => {
  let color = 'bg-gray-500';
  let text = 'Neutral';
  let pulse = '';
  if (sentiment === 'positive') {
    color = 'bg-green-500';
    text = 'Positive';
    pulse = 'animate-pulse';
  } else if (sentiment === 'negative') {
    color = 'bg-red-500';
    text = 'Negative';
    pulse = 'animate-pulse';
  }
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white/90 shadow-md ${color} ${pulse} transition-all duration-300`}>
      {text}
    </span>
  );
};

const JournalHistory = ({ entries }) => {
  const safeEntries = Array.isArray(entries) ? entries : [];
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {safeEntries.map((entry, idx) => (
        <motion.div
          key={entry._id || idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: idx * 0.08 }}
          className="bg-gradient-to-br from-black/50 to-black/80 border border-white/10 rounded-xl p-5 shadow-xl hover:scale-[1.02] hover:shadow-pink-500/30 transition-transform duration-300 group relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-poppins">
              {entry.title}
            </h3>
            <span className="text-2xl" title={entry.mood}>
              {moodEmoji[entry.mood] || '📝'}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-white/80 font-inter">
              {formatDate(entry.createdAt)}
            </span>
            {entry.sentiment && <SentimentBadge sentiment={entry.sentiment} />}
          </div>
          <p className="text-white/80 font-inter whitespace-pre-line mt-2">
            {entry.content}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default JournalHistory; 