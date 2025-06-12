const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, bookController.listBooks);
router.get('/create', verifyToken, bookController.showCreateForm);
router.post('/create', verifyToken, bookController.createBook);
router.get('/edit/:id', verifyToken, bookController.showEditForm);
router.post('/edit/:id', verifyToken, bookController.updateBook);
router.get('/delete/:id', verifyToken, bookController.deleteBook);

module.exports = router;
