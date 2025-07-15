import React, { useEffect, useState } from 'react';
import api from '../api';
import JournalForm from '../components/JournalForm';
import JournalHistory from '../components/JournalHistory';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch journal entries on mount
  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/api/journal');
        setEntries(res.data);
      } catch (err) {
        setError('Failed to fetch journal entries.');
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-poppins font-bold glow-text mb-6">
              Journal
            </h1>
            <p className="text-gray-300 text-lg">
              Your personal space for thoughts, feelings, and reflections.
            </p>
          </div>

          {/* Journal Entries List */}
          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-semibold text-white mb-4">Your Entries</h2>
            {loading ? (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : error ? (
              <div className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-sm mb-2">{error}</div>
            ) : (
              <JournalHistory entries={entries} />
            )}
          </div>

          <JournalForm />
        </div>
      </div>
    </div>
  );
};

export default Journal; 