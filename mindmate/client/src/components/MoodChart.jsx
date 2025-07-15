import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Dot
} from 'recharts';
import { motion } from 'framer-motion';

const MOOD_MAP = {
  happy: { value: 5, emoji: '😄', label: 'Happy' },
  okay: { value: 4, emoji: '🙂', label: 'Okay' },
  neutral: { value: 3, emoji: '😐', label: 'Neutral' },
  sad: { value: 2, emoji: '😢', label: 'Sad' },
  crying: { value: 1, emoji: '😭', label: 'Crying' },
  anxious: { value: 2, emoji: '😰', label: 'Anxious' },
  angry: { value: 1, emoji: '😠', label: 'Angry' },
};

const getDay = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short' });
};

const getTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const mood = payload[0].payload;
    return (
      <div className="bg-black/80 border border-white/20 rounded-xl p-3 text-white/90 shadow-lg backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{mood.emoji}</span>
          <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            {mood.label}
          </span>
        </div>
        <div className="text-xs text-white/60">{mood.day}, {mood.time}</div>
      </div>
    );
  }
  return null;
};

const MoodChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/mood');
        // Sort by date, take last 7
        const moods = Array.isArray(res.data) ? res.data : [];
        const last7 = moods.slice(-7).map((m) => {
          const moodInfo = MOOD_MAP[m.mood] || MOOD_MAP['neutral'];
          return {
            value: moodInfo.value,
            emoji: moodInfo.emoji,
            label: moodInfo.label,
            day: getDay(m.createdAt),
            time: getTime(m.createdAt),
            createdAt: m.createdAt,
          };
        });
        setData(last7);
      } catch (err) {
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMoods();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="bg-gradient-to-tr from-[#121212] to-[#1a1a2e] rounded-2xl border border-white/10 shadow-2xl p-8 max-w-2xl mx-auto mt-8 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl animate-pulse">💡</span>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-poppins">
          Mood Over the Week
        </h2>
        <span className="ml-2 animate-pulse">✨</span>
      </div>
      <div className="w-full h-64">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="moodLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff11" />
              <XAxis dataKey="day" tick={{ fill: '#fff', fontSize: 14, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fill: '#fff', fontSize: 14, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ec4899', strokeWidth: 1, opacity: 0.2 }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#moodLine)"
                strokeWidth={4}
                dot={<Dot r={8} stroke="#fff" strokeWidth={2} fill="#ec4899" filter="drop-shadow(0 0 8px #ec4899)" />}
                activeDot={{ r: 10, style: { filter: 'drop-shadow(0 0 12px #8b5cf6)' } }}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default MoodChart; 