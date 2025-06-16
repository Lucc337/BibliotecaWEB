const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, bookController.listBooks);
router.get('/create', verifyToken, bookController.getCreateBook);
router.post('/create', verifyToken, bookController.postCreateBook);
router.get('/edit/:id', verifyToken, bookController.getEditBook);
router.post('/edit/:id', verifyToken, bookController.postEditBook);
router.get('/delete/:id', verifyToken, bookController.deleteBook);

module.exports = router;
