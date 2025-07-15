import React from 'react';
import { Link } from 'react-router-dom';
import { FaceSmileIcon, BookOpenIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import AffirmationCard from '../components/AffirmationCard';

const features = [
  {
    name: 'Mood Tracker',
    description: 'Track your daily moods and emotional patterns.',
    to: '/mood',
    icon: <FaceSmileIcon className="h-10 w-10 text-green-400 drop-shadow-glow" />,
    gradient: 'from-green-500 to-teal-500',
  },
  {
    name: 'Journal',
    description: 'Reflect on your thoughts and feelings in a private space.',
    to: '/journal',
    icon: <BookOpenIcon className="h-10 w-10 text-purple-400 drop-shadow-glow" />,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'AI Chat',
    description: 'Chat with your supportive AI mental health companion.',
    to: '/chat',
    icon: <ChatBubbleLeftRightIcon className="h-10 w-10 text-blue-400 drop-shadow-glow" />,
    gradient: 'from-blue-500 to-purple-500',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background visuals */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glowing accent elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-glow"></div>
      <div className="absolute bottom-20 right-20 w-3 h-3 bg-pink-400 rounded-full animate-glow animation-delay-1000"></div>
      <div className="absolute top-1/2 right-10 w-1 h-1 bg-blue-400 rounded-full animate-glow animation-delay-2000"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-lg animate-glow">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold glow-text mb-4 font-poppins">
            MindMate
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-4 font-light font-inter">
            Your AI Mental Wellness Copilot
          </h2>
          <p className="text-gray-400 text-lg mb-2 leading-relaxed font-inter">
            Choose a feature to get started:
          </p>
        </div>

        {/* Daily Affirmation Card */}
        <div className="mb-12">
          <AffirmationCard />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className={`glass-card rounded-2xl p-8 flex flex-col items-center shadow-2xl border border-white/10 transition-transform hover:scale-105 hover:shadow-pink-500/30 group`}
            >
              <div className={`mb-4 p-4 rounded-full bg-gradient-to-br ${feature.gradient} shadow-lg animate-glow`}>{feature.icon}</div>
              <h3 className="text-2xl font-poppins font-semibold text-white mb-2 group-hover:glow-text transition-all">{feature.name}</h3>
              <p className="text-gray-300 text-center mb-6 font-inter">{feature.description}</p>
              <Link
                to={feature.to}
                className={`px-6 py-3 bg-gradient-to-r ${feature.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-500/30`}
              >
                Go to {feature.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 