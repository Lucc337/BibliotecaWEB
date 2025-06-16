const db = require('../models/db');

// Listar livros
exports.listBooks = (req, res) => {
  const userId = req.user.id;
  db.query('SELECT * FROM books WHERE user_id = ?', [userId], (err, results) => {
    if (err) throw err;
    res.render('books', { books: results });
  });
};

// Tela de criação
exports.getCreateBook = (req, res) => {
  res.render('createBook');
};

// Criar livro
exports.postCreateBook = (req, res) => {
  const userId = req.user.id;
  const { title, author, publisher, year, isbn, quantity, category, description } = req.body;

  if (!title || !author || !publisher || !year || !isbn || !quantity || !category) {
    return res.send('Todos os campos são obrigatórios.');
  }

  const bookData = {
    title,
    author,
    publisher,
    year: parseInt(year),
    isbn,
    quantity: parseInt(quantity),
    category,
    description,
    user_id: userId
  };

  db.query('INSERT INTO books SET ?', bookData, (err) => {
    if (err) throw err;
    res.redirect('/books');
  });
};

// Tela de edição
exports.getEditBook = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  db.query('SELECT * FROM books WHERE id = ? AND user_id = ?', [id, userId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.send('Livro não encontrado ou você não tem permissão.');
    res.render('editBook', { book: results[0] });
  });
};

// Atualizar livro
exports.postEditBook = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const { title, author, publisher, year, isbn, quantity, category, description } = req.body;

  const bookData = {
    title,
    author,
    publisher,
    year: parseInt(year),
    isbn,
    quantity: parseInt(quantity),
    category,
    description
  };

  db.query('UPDATE books SET ? WHERE id = ? AND user_id = ?', [bookData, id, userId], (err) => {
    if (err) throw err;
    res.redirect('/books');
  });
};

// Excluir livro
exports.deleteBook = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  db.query('DELETE FROM books WHERE id = ? AND user_id = ?', [id, userId], (err) => {
    if (err) throw err;
    res.redirect('/books');
  });
};
