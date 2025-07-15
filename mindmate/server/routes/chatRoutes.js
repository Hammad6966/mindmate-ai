const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../utils/authMiddleware');

// Apply auth middleware to chat routes
router.use(authMiddleware);

// POST /api/chat - Send message to GPT and get response
router.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: 'OpenRouter API key not configured' });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-3.1-8b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a supportive AI mental health companion. Provide empathetic, helpful responses to users sharing their thoughts and feelings. Keep responses concise but caring.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'MindMate'
        }
      }
    );

    const gptResponse = response.data.choices[0].message.content;
    res.json({ response: gptResponse });

  } catch (error) {
    console.error('Chat API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

module.exports = router; 