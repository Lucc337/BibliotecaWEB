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
    return res.render('error', { message: 'Todos os campos são obrigatórios.' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.render('error', { message: 'Erro no banco de dados.' });
    }

    if (results.length > 0) {
      return res.render('error', { message: 'Este e-mail já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    db.query('INSERT INTO users SET ?', { name, email, password: hashedPassword }, (err) => {
      if (err) {
        console.error(err);
        return res.render('error', { message: 'Erro ao cadastrar usuário.' });
      }

      res.redirect('/login');
    });
  });
};


// Tela de login
exports.getLogin = (req, res) => {
  res.render('login', { message: null });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('error', { message: 'Insira e-mail e senha.' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.render('error', { message: 'Erro na consulta do banco.' });
    }

    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      return res.render('error', { message: 'E-mail ou senha incorretos.' });
    }

    const token = jwt.sign({ id: results[0].id, name: results[0].name }, process.env.JWT_SECRET, {
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
