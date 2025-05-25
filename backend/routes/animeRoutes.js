const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // 設定上傳檔案目的地
const {
  getAllAnimes,
  createAnime,
  updateAnime,
  deleteAnime,
  getByStatus,
  getStats
} = require('../controllers/animeController');

const { uploadImage } = require('../controllers/animeController');

router.use(verifyToken);

router.get('/', getAllAnimes);
router.post('/', createAnime);
router.put('/:id', updateAnime);
router.delete('/:id', deleteAnime);
router.get('/filter/status/:status', getByStatus);
router.get('/stats', getStats);
router.post('/:id/upload-image', upload.single('image'), uploadImage);



module.exports = router;
