const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController');

router.get('/', verifyToken, bookController.listBooks);
router.get('/create', verifyToken, bookController.getCreateBook);
router.post('/create', verifyToken, bookController.postCreateBook);
router.get('/edit/:id', verifyToken, bookController.getEditBook);
router.post('/edit/:id', verifyToken, bookController.postEditBook);
router.get('/delete/:id', verifyToken, bookController.deleteBook);

module.exports = router;
