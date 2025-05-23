const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  getAllAnimes,
  createAnime,
  updateAnime,
  deleteAnime,
  getByStatus,
  getStats
} = require('../controllers/animeController');

router.use(verifyToken);

router.get('/', getAllAnimes);
router.post('/', createAnime);
router.put('/:id', updateAnime);
router.delete('/:id', deleteAnime);
router.get('/filter/status/:status', getByStatus);
router.get('/stats', getStats);

module.exports = router;
