import express from 'express'

import { getAllBooks, getBookById, createBook, updateBook, deleteBook} from '../controllers/booksController.js';
import validateBook from '../middlewares/validateMiddleware.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', auth, validateBook, createBook);
router.put('/:id', auth, validateBook, updateBook);
router.delete('/:id', auth, deleteBook);

export default router;