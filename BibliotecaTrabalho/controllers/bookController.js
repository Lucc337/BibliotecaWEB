const db = require('../models/db');

// Listar livros
exports.listBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
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
  const { title, author } = req.body;

  if (!title || !author) {
    return res.send('Todos os campos são obrigatórios.');
  }

  db.query('INSERT INTO books SET ?', { title, author }, (err, result) => {
    if (err) throw err;
    res.redirect('/books');
  });
};

// Tela de edição
exports.getEditBook = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.render('editBook', { book: results[0] });
  });
};

// Atualizar livro
exports.postEditBook = (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;

  db.query('UPDATE books SET title = ?, author = ? WHERE id = ?', [title, author, id], (err, result) => {
    if (err) throw err;
    res.redirect('/books');
  });
};

// Excluir livro
exports.deleteBook = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.redirect('/books');
  });
};
