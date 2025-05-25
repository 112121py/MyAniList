const express = require('express');
const router = express.Router();
const { followUser, getFollowedAnimes } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);

router.post('/follow', followUser);
router.get('/followed-animes', getFollowedAnimes);

module.exports = router;