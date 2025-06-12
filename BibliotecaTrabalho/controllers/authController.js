const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Tela de registro
exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send('Todos os campos são obrigatórios.');
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.send('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    db.query('INSERT INTO users SET ?', { name, email, password: hashedPassword }, (err) => {
      if (err) throw err;
      res.redirect('/login');
    });
  });
};

// Tela de login
exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send('Insira e-mail e senha.');
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) throw err;
    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      return res.send('E-mail ou senha incorretos.');
    }

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/books');
  });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
