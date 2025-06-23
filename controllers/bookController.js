const db = require('../models/db');

// Listar livros
exports.listBooks = (req, res) => {
  const userId = req.user.id;
  const userName = req.user.name;

  db.query('SELECT * FROM books WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.render('error', { message: 'Erro ao listar livros.' });
    }
    res.render('books', { books: results, userName });
  });
};

// Tela de criação dos livros
exports.getCreateBook = (req, res) => {
  res.render('editBook', {
    title: 'Cadastrar',
    action: '/books/create',
    book: {}
  });
};


// Criar livro
exports.postCreateBook = (req, res) => {
  const userId = req.user.id;
  const { title, author, publisher, year, isbn, quantity, category, description, cover } = req.body;

  if (!title || !author || !publisher || !year || !isbn || !quantity || !category) {
    return res.send('error', { message: 'Todos os campos são obrigatórios.' });
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
    cover,
    user_id: userId
  };

  const sql = 'INSERT INTO books SET ?';
  db.query(sql, bookData, (err) => {
    if (err) throw err;
    res.redirect('/books');
  });
};


exports.getBookDetails = (req, res) => {
  const bookId = req.params.id;
  const userId = req.user.id;

  db.query('SELECT * FROM books WHERE id = ? AND user_id = ?', [bookId, userId], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.send('Livro não encontrado ou você não tem permissão.');
    }

    res.render('bookDetail', { book: results[0], user: req.user });
  });
};


// Tela de edição
exports.getEditBook = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  db.query('SELECT * FROM books WHERE id = ? AND user_id = ?', [id, userId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.send('Livro não encontrado ou você não tem permissão.');
    res.render('editBook', {
      title: 'Editar',
      action: `/books/edit/${id}`,
      book: results[0]
    });

  });
};

// Atualizar livro
exports.postEditBook = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const { title, author, publisher, year, isbn, quantity, category, cover, description } = req.body;

  const bookData = {
    title,
    author,
    publisher,
    year: parseInt(year),
    isbn,
    quantity: parseInt(quantity),
    category,
    cover,
    description
  };

  db.query('UPDATE books SET ? WHERE id = ? AND user_id = ?', [bookData, id, userId], (err) => {
    if (err) throw err;
    res.redirect('/books');
  });
};

// Buscar livros
exports.searchBooks = (req, res) => {
  const userId = req.user.id;
  const searchQuery = req.query.q;

  const sql = `
    SELECT * FROM books 
    WHERE user_id = ? 
    AND (title LIKE ? OR author LIKE ? OR category LIKE ?)
  `;

  const queryParam = `%${searchQuery}%`;

  db.query(sql, [userId, queryParam, queryParam, queryParam], (err, results) => {
    if (err) throw err;
    res.render('books', { books: results, userName: req.user.name });
  });
};

// Excluir livro
exports.deleteBook = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  db.query('DELETE FROM books WHERE id = ? AND user_id = ?', [id, userId], (err) => {
    if (err) {
      console.error(err);
      return res.render('error', { message: 'Erro ao deletar livro.' });
    }
    res.redirect('/books');
  });
};

