import express from 'express';
import bookController from '../../controllers/mod/bookController';
import hasAuth from '../../middleware/hasAuth';

const router = express.Router();

router.get('/create', hasAuth, bookController.renderCreateBook);

router.post('/create', hasAuth, bookController.createBook);

router.get('/update/:id', hasAuth, bookController.renderUpdateBook);

router.post('/update/:id', hasAuth, bookController.updateBook);

router.get('/:id', hasAuth, bookController.getBookPage);

router.post('/delete/:id', hasAuth, bookController.deleteBook);

export default router;
