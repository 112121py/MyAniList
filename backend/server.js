// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const animeRoutes = require('./routes/animeRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/anime', animeRoutes);
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', userRoutes);

// DB & Server
mongoose.connect(process.env.MONGODB_URI)
  .then((conn) => {
    console.log(' MongoDB connected:', conn.connection.name);
    app.listen(process.env.PORT, () => console.log(` Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error(' MongoDB connection error:', err));
