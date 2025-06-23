const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// rotas
router.get('/', authMiddleware, bookController.listBooks);
router.get('/create', authMiddleware, bookController.getCreateBook);
router.post('/create', authMiddleware, bookController.postCreateBook);
router.get('/edit/:id', authMiddleware, bookController.getEditBook);
router.post('/edit/:id', authMiddleware, bookController.postEditBook);
router.post('/delete/:id', authMiddleware, bookController.deleteBook);
router.get('/search', authMiddleware, bookController.searchBooks);

router.get('/:id', authMiddleware, bookController.getBookDetails); 

module.exports = router;
