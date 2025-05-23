const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['watching', 'completed', 'planned'], default: 'planned' },
  progress: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 10 },
  tags: [String],
  images: [{type: String}],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Anime', animeSchema);
