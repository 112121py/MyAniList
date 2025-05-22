const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

// 註冊處理
const register = async (req, res) => {
  try {
    const user = new User(req.body);

    // error handling
    if (!user.username || !user.password) {
      return res.status(400).json({ success: false, error: '請提供帳號和密碼' });
    }
    const existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
      return res.status(400).json({ success: false, error: '帳號已存在' });
    }

    await user.save();
    // console.log('register success:', user);
    res.json({ success: true, message: '註冊成功' });
  } catch (err) {
    res.status(400).json({ success: false, error: '註冊失敗' });
    console.error('註冊失敗:', err);
  }
};

// 登入處理
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, error: '找不到帳號' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, error: '密碼錯誤' });

    const token = generateToken(user);
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, error: '登入錯誤' });
  }
};

module.exports = { register, login };
