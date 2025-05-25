const User = require('../models/User');
const Anime = require('../models/anime');

// 追蹤別人
const followUser = async (req, res) => {
  const { username } = req.body;
  const myId = req.user.id;

  try {
    if (!username) return res.status(400).json({ success: false, error: '請提供 username' });

    const targetUser = await User.findOne({ username });
    if (!targetUser) return res.status(404).json({ success: false, error: '找不到該使用者' });

    if (targetUser._id.equals(myId)) return res.status(400).json({ success: false, error: '不能追蹤自己' });

    const me = await User.findById(myId);
    if (!me.followedUsers.includes(targetUser._id)) {
      me.followedUsers.push(targetUser._id);
      await me.save();
    }

    res.json({ success: true, message: `已追蹤 ${username}` });
  } catch (err) {
    res.status(500).json({ success: false, error: '追蹤失敗' });
  }
};

// 查看追蹤的使用者的動畫清單
const getFollowedAnimes = async (req, res) => {
  try {
    const me = await User.findById(req.user.id);

    const animes = await Anime.find({ userId: { $in: me.followedUsers } })
      .populate('userId', 'username') // 取得 username
      .lean();

    res.json({ success: true, data: animes });
  } catch (err) {
    res.status(500).json({ success: false, error: '無法取得追蹤者動畫' });
  }
};

module.exports = {
  followUser,
  getFollowedAnimes
};
