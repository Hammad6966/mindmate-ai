const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journalRoutes');
const moodRoutes = require('./routes/moodRoutes');
const chatRoutes = require('./routes/chatRoutes');
const sentimentRoutes = require('./routes/sentimentRoutes');

app.use(authRoutes);
app.use(journalRoutes);
app.use(moodRoutes);
app.use(chatRoutes);
app.use(sentimentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('MindMate API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
