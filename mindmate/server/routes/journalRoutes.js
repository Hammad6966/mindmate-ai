const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const journalController = require('../controllers/journalController');

// Apply auth middleware to all journal routes
router.use(authMiddleware);

// POST /api/journal - Save a journal entry
router.post('/api/journal', journalController.createJournal);

// GET /api/journal - Fetch all journals for the logged-in user
router.get('/api/journal', journalController.getUserJournals);

module.exports = router; 