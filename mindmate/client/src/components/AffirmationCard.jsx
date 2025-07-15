import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api';

// Local affirmations list
const LOCAL_AFFIRMATIONS = [
  "You are doing your best, and that is enough 💖",
  "Your strength is greater than any challenge ✨",
  "Every day is a new opportunity to shine 🌟",
  "You are worthy of love, respect, and happiness 💫",
  "Your kindness makes the world a better place 🌸",
  "You have the power to create positive change 🔮",
  "Your voice matters and deserves to be heard 🎵",
  "You are surrounded by love and support 💝",
  "Every step forward is progress worth celebrating 🎉",
  "You are capable of amazing things 🌈",
  "Your resilience inspires others 🌺",
  "You are exactly where you need to be right now 🧭",
  "Your dreams are valid and achievable ⭐",
  "You bring unique value to this world 💎",
  "Your presence makes a difference 🌟",
  "You are stronger than you think 💪",
  "Your heart is full of beautiful possibilities 🌹",
  "You deserve all the good things coming your way 🎁",
  "Your journey is uniquely yours and perfect 🛤️",
  "You are loved beyond measure 💕"
];

const AffirmationCard = () => {
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getDailyAffirmation = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('dailyAffirmation');
    
    if (stored) {
      const { date, text } = JSON.parse(stored);
      if (date === today) {
        return text;
      }
    }
    
    // Get random affirmation
    const randomAffirmation = LOCAL_AFFIRMATIONS[Math.floor(Math.random() * LOCAL_AFFIRMATIONS.length)];
    
    // Store for today
    localStorage.setItem('dailyAffirmation', JSON.stringify({
      date: today,
      text: randomAffirmation
    }));
    
    return randomAffirmation;
  };

  const fetchAIAffirmation = async () => {
    try {
      const response = await api.get('/api/affirmation');
      if (response.data && response.data.affirmation) {
        return response.data.affirmation;
      }
    } catch (err) {
      console.log('Could not fetch AI affirmation, using local one');
    }
    return null;
  };

  useEffect(() => {
    const loadAffirmation = async () => {
      setLoading(true);
      try {
        // Try to get AI affirmation first, fallback to local
        let dailyAffirmation = await fetchAIAffirmation();
        if (!dailyAffirmation) {
          dailyAffirmation = getDailyAffirmation();
        }
        setAffirmation(dailyAffirmation);
      } catch (err) {
        setError('Failed to load affirmation');
        setAffirmation(getDailyAffirmation()); // Fallback to local
      } finally {
        setLoading(false);
      }
    };

    loadAffirmation();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto mt-10"
      >
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-pink-400/30 p-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2 
      }}
      className="max-w-md mx-auto mt-10"
    >
      <motion.div
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)"
        }}
        transition={{ duration: 0.3 }}
        className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-pink-400/30 hover:border-pink-400/50 hover:shadow-pink-500/40 transition-all duration-300 p-8 relative overflow-hidden"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl animate-pulse"></div>
        
        {/* Floating sparkles */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-4 right-4 text-pink-400 text-xl"
        >
          ✨
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-4 left-4 text-purple-400 text-xl"
        >
          💖
        </motion.div>

        {/* Main content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-xl font-semibold text-white/90 leading-relaxed font-poppins"
            >
              {affirmation}
            </motion.p>
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mx-auto mt-6 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full"
          />
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AffirmationCard; 