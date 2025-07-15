const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const moodController = require('../controllers/moodController');

// Apply auth middleware to all mood routes
router.use(authMiddleware);

// POST /api/mood - Save a mood with userId and timestamp
router.post('/api/mood', moodController.createMood);

// GET /api/mood - Return the user's recent moods
router.get('/api/mood', moodController.getUserMoods);

module.exports = router; 