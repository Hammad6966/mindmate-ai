import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blur elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      {/* Glowing accent elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-glow"></div>
      <div className="absolute bottom-20 right-20 w-3 h-3 bg-pink-400 rounded-full animate-glow animation-delay-1000"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="glass-card rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg animate-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold glow-text mb-2 font-poppins">
              Welcome Back
            </h1>
            <p className="text-gray-400 font-inter">Sign in to continue your journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-4 glass rounded-2xl text-white placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                placeholder="Email"
                required
                disabled={isLoading}
              />
              <label className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-dark-primary px-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm transition-all duration-300 font-inter">
                Email
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-4 glass rounded-2xl text-white placeholder-transparent peer focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                placeholder="Password"
                required
                disabled={isLoading}
              />
              <label className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-dark-primary px-2 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-sm transition-all duration-300 font-inter">
                Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-poppins"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 font-inter">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300 font-inter"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 