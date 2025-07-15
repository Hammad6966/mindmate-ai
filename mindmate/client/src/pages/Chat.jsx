import React, { useState, useRef } from 'react';
import api from '../api';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hi! I am your AI mental health companion. How are you feeling today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError('');
    setIsLoading(true);
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    try {
      const res = await api.post('/api/chat', { message: userMessage.text });
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: res.data.response }
      ]);
    } catch (err) {
      setError('Failed to get AI response.');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-poppins font-bold glow-text mb-6">
              AI Chat
            </h1>
            <p className="text-gray-300 text-lg">
              Chat with your AI companion for mental health support.
            </p>
          </div>

          {/* Chat Window */}
          <div className="glass-card rounded-2xl p-6 mb-4 h-[400px] overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-md font-inter text-base whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none'
                      : 'bg-black/30 text-gray-100 rounded-bl-none border border-white/10'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-sm mb-2">
              {error}
            </div>
          )}

          {/* Chat Input */}
          <form onSubmit={handleSend} className="flex gap-2 items-center">
            <input
              type="text"
              className="flex-1 px-4 py-3 rounded-xl bg-black/20 text-white/80 border border-white/10 focus:outline-none focus:border-pink-400 transition-all duration-300"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat; 