const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token;

  // 1. Спроба взяти токен з заголовку
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // 2. Або з cookie (додай cookie-parser)
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    // Якщо API-запит — JSON, якщо сторінка — редирект
    return req.accepts('html')
      ? res.redirect('/unauthorized') // або /login
      : res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};
