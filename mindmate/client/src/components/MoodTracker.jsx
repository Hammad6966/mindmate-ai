import React, { useState } from 'react';
import api from '../api';

const MOODS = [
  { value: 'happy', emoji: '😄', label: 'Happy' },
  { value: 'okay', emoji: '🙂', label: 'Okay' },
  { value: 'neutral', emoji: '😐', label: 'Neutral' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
  { value: 'crying', emoji: '😭', label: 'Crying' },
];

const MoodTracker = () => {
  const [selected, setSelected] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState('');

  const handleSelect = async (mood) => {
    setSelected(mood.value);
    setIsSaving(true);
    try {
      await api.post('/api/mood', { mood: mood.value });
      setToast('Mood saved! 💖');
      setTimeout(() => setToast(''), 2000);
    } catch (err) {
      setToast('Failed to save mood.');
      setTimeout(() => setToast(''), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-black/30 rounded-2xl shadow-2xl p-8 max-w-xl mx-auto flex flex-col items-center group hover:shadow-pink-500/20 transition-shadow duration-300">
      {/* Floating label/title */}
      <div className="mb-6">
        <span className="block text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-poppins animate-pulse">
          How are you feeling today?
        </span>
      </div>
      {/* Mood emojis row */}
      <div className="flex flex-row justify-center gap-4 md:gap-8 w-full">
        {MOODS.map((mood) => (
          <button
            key={mood.value}
            type="button"
            disabled={isSaving}
            onClick={() => handleSelect(mood)}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-white/10 hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-500/30
              ${selected === mood.value ? 'ring-4 ring-pink-500/50 scale-110' : ''}
              hover:scale-110`}
            aria-label={mood.label}
          >
            <span>{mood.emoji}</span>
          </button>
        ))}
      </div>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-lg animate-bounce z-50">
          {toast}
        </div>
      )}
    </div>
  );
};

export default MoodTracker; 