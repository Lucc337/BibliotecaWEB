const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas protegidas
router.get('/', authMiddleware, bookController.listBooks);
router.get('/create', authMiddleware, bookController.getCreateBook);
router.post('/create', authMiddleware, bookController.postCreateBook);
router.get('/edit/:id', authMiddleware, bookController.getEditBook);
router.post('/edit/:id', authMiddleware, bookController.postEditBook);
router.post('/delete/:id', authMiddleware, bookController.deleteBook);
router.get('/:id', authMiddleware, bookController.getBookDetails); // ⚠️ Aqui também precisa!

module.exports = router;
