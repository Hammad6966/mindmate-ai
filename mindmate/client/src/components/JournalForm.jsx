import React, { useState } from 'react';
import api from '../api';

const JournalForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSentiment(null);
    setError('');

    try {
      // 1. Save journal entry
      await api.post('/api/journal', formData);

      // 2. Analyze sentiment
      const sentimentRes = await api.post('/api/sentiment', { text: formData.content });
      setSentiment(sentimentRes.data.sentiment);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentConfig = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return {
          emoji: '😊',
          text: 'Positive',
          color: 'green',
          glow: 'shadow-lg shadow-green-500/50',
          border: 'border-green-500/50'
        };
      case 'neutral':
        return {
          emoji: '😐',
          text: 'Neutral',
          color: 'gray',
          glow: 'shadow-lg shadow-gray-500/50',
          border: 'border-gray-500/50'
        };
      case 'negative':
        return {
          emoji: '😢',
          text: 'Negative',
          color: 'red',
          glow: 'shadow-lg shadow-red-500/50',
          border: 'border-red-500/50'
        };
      default:
        return null;
    }
  };

  const sentimentConfig = sentiment ? getSentimentConfig(sentiment) : null;

  return (
    <div className="bg-white/5 p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm">
      <h2 className="text-2xl font-poppins font-semibold text-white mb-6">
        Write Your Thoughts
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 font-inter">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-transparent text-white border-b-2 border-pink-400 focus:outline-none focus:border-pink-300 transition-all duration-300 placeholder:text-white/40"
            placeholder="What's on your mind?"
            required
          />
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 font-inter">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full min-h-[150px] px-4 py-3 bg-black/20 rounded-lg text-white/80 placeholder:text-white/40 border border-white/10 focus:outline-none focus:border-pink-400 transition-all duration-300 resize-none"
            placeholder="Express your thoughts, feelings, and experiences..."
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-sm mb-2">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'Analyzing...' : 'Submit Entry'}
        </button>
      </form>

      {/* Loading Animation */}
      {isLoading && (
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}

      {/* Sentiment Result */}
      {sentiment && sentimentConfig && (
        <div className="mt-6 transition-all ease-in-out duration-300 animate-in slide-in-from-bottom-2">
          <div className={`p-4 rounded-xl border ${sentimentConfig.border} ${sentimentConfig.glow} bg-black/20 backdrop-blur-sm`}>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-3xl animate-pulse">
                {sentimentConfig.emoji}
              </span>
              <div className="text-center">
                <p className="text-white font-semibold text-lg">
                  {sentimentConfig.text} Sentiment
                </p>
                <p className="text-gray-400 text-sm">
                  Your entry has been analyzed
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalForm; 