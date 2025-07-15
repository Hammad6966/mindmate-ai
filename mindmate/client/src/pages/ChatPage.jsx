import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const initialMessages = [
  {
    sender: 'ai',
    text: 'Hi! I am MindMate. How can I support you today?',
    timestamp: new Date().toISOString(),
  },
];

const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sendAnim, setSendAnim] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError('');
    setSendAnim(true);
    setIsLoading(true);
    const userMsg = {
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    try {
      const res = await axios.post('/api/chat', { message: userMsg.text });
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: res.data.response,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError('Failed to get AI response.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSendAnim(false), 500);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#1e1e2f] to-[#2c2c3e] flex flex-col justify-between">
      {/* Chat area */}
      <div className="flex-1 flex flex-col justify-end max-w-2xl mx-auto w-full px-2 md:px-0 py-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 h-full overflow-y-auto flex flex-col gap-4 shadow-2xl">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex flex-col items-end max-w-[70%]">
                <div
                  className={`px-4 py-2 rounded-xl text-base font-inter shadow-md break-words ${
                    msg.sender === 'user'
                      ? 'bg-pink-500 text-white rounded-br-none'
                      : 'bg-white/10 text-white/80 border-l-4 border-purple-500 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-sm text-white/40 mt-1 self-end">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex flex-col items-start max-w-[70%]">
                <div className="px-4 py-2 rounded-xl bg-white/10 text-white/60 border-l-4 border-purple-500 rounded-bl-none font-inter flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                  <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-200"></span>
                  <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-400"></span>
                  <span className="ml-2">Typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {error && (
          <div className="text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-sm mt-2">{error}</div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSend}
        className="w-full max-w-2xl mx-auto flex items-center gap-2 px-2 md:px-0 pb-6 sticky bottom-0 z-10"
        style={{ background: 'rgba(30,30,47,0.7)' }}
      >
        <input
          type="text"
          className="flex-1 px-4 py-4 rounded-xl bg-black/30 text-white/90 border border-white/10 focus:outline-none focus:border-pink-400 transition-all duration-300 font-inter shadow-md"
          placeholder="Talk to MindMate…"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`flex items-center justify-center px-5 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-500/30 ${sendAnim ? 'animate-bounce' : ''}`}
        >
          <PaperAirplaneIcon className={`h-6 w-6 ${sendAnim ? 'animate-spin' : ''}`} />
        </button>
      </form>
    </div>
  );
};

export default ChatPage; 