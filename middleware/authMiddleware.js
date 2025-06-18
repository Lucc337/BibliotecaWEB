const jwt = require('jsonwebtoken');
const db = require('../models/db');

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res.redirect('/login');
      }

      req.user = results[0];
      next();
    });
  } catch (error) {
    return res.redirect('/login');
  }
};
