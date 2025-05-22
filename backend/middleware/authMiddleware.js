// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 取出 Bearer token

  if (!token) {
    return res.status(401).json({ success: false, error: '未提供 JWT token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 把解碼後的 user 附加上去
    next();
  } catch (err) {
    res.status(403).json({ success: false, error: 'Token 驗證失敗' });
  }
};

module.exports = verifyToken;
