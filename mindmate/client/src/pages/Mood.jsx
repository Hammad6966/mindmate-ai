import React, { useState, useEffect } from 'react';
import api from '../api';
import MoodTracker from '../components/MoodTracker';
import MoodChart from '../components/MoodChart';

const MOOD_OPTIONS = [
  { value: 'happy', label: '😊 Happy', color: 'text-green-400' },
  { value: 'neutral', label: '😐 Neutral', color: 'text-gray-400' },
  { value: 'sad', label: '😢 Sad', color: 'text-red-400' },
  { value: 'anxious', label: '😰 Anxious', color: 'text-blue-400' },
  { value: 'angry', label: '😠 Angry', color: 'text-yellow-400' },
];

const Mood = () => {
  const [error, setError] = useState('');
  const [moods, setMoods] = useState([]);

  // Fetch recent moods
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await api.get('/api/mood');
        setMoods(res.data);
      } catch (err) {
        setError('Failed to fetch moods.');
      }
    };
    fetchMoods();
  }, []);

  // Ensure moods is always an array
  const safeMoods = Array.isArray(moods) ? moods : [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-poppins font-bold glow-text mb-6">
              Mood Tracker
            </h1>
            <p className="text-gray-300 text-lg">
              Track your daily moods and emotional patterns.
            </p>
          </div>

          {/* MoodTracker component */}
          <MoodTracker />

          {/* Mood Chart */}
          <MoodChart />

          {/* Error Message */}
          {error && (
            <div className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-sm mb-4">
              {error}
            </div>
          )}

          {/* Recent Moods */}
          <div className="glass-card rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-poppins font-semibold text-white mb-4">Recent Moods</h2>
            {safeMoods.length === 0 ? (
              <p className="text-gray-400">No moods tracked yet.</p>
            ) : (
              <ul className="space-y-2">
                {safeMoods.map((m, idx) => {
                  const opt = MOOD_OPTIONS.find(o => o.value === m.mood);
                  return (
                    <li key={m._id || idx} className="flex items-center gap-3">
                      <span className={`text-2xl ${opt?.color || ''}`}>{opt?.label?.split(' ')[0] || m.mood}</span>
                      <span className="text-gray-300 font-inter">{new Date(m.createdAt).toLocaleString()}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mood; 