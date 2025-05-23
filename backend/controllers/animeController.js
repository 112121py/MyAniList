const Anime = require('../models/anime');
const mongoose = require('mongoose');

// 取得目前user的所有動畫
const getAllAnimes = async (req, res) => {
  try {
    const animes = await Anime.find({ userId: req.user.id });
    res.json({ success: true, data: animes });
  } catch (err) {
    res.status(500).json({ success: false, error: '無法取得動畫清單' });
  }
};

// 新增動畫
const createAnime = async (req, res) => {
  try {
    const newAnime = new Anime({ ...req.body, userId: req.user.id });
    const savedAnime = await newAnime.save();
    res.status(201).json({ success: true, data: savedAnime });
  } catch (err) {
    res.status(400).json({ success: false, error: '新增動畫失敗' });
  }
};

// 修改動畫
const updateAnime = async (req, res) => {
  try {
    const updated = await Anime.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, error: '找不到動畫或無權限' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: '更新動畫失敗' });
  }
};

// 刪除動畫
const deleteAnime = async (req, res) => {
  try {
    const deleted = await Anime.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ success: false, error: '找不到動畫或無權限' });
    res.json({ success: true, message: '動畫已刪除' });
  } catch (err) {
    res.status(500).json({ success: false, error: '刪除動畫失敗' });
  }
};

// 依狀態分類查詢動畫
const getByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const result = await Anime.find({ userId: req.user.id, status });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: '查詢狀態失敗' });
  }
};

// 統計 API：觀看狀態分佈、熱門標籤
const getStats = async (req, res) => {
  try {
    console.log('getStats:', req.user._id);
    console.log('req.user:', req.user);
    // console.log('req:', req);

    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    const statusStats = await Anime.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const tagStats = await Anime.aggregate([
      { $match: { userId: userObjectId } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({ success: true, data: { statusStats, tagStats } });
  } catch (err) {
    console.error('統計資料錯誤:', err);
    res.status(500).json({ success: false, error: '取得統計資料失敗' });
  }
};

module.exports = {
  getAllAnimes,
  createAnime,
  updateAnime,
  deleteAnime,
  getByStatus,
  getStats
};
