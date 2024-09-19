import express from 'express';
import multer from '../../middleware/fileUpload';
import bookController from '../../controllers/api/bookController';

const router = express.Router();

router.get('/', bookController.getBooks);

router.get('/:id', bookController.getBookById);

router.post('/', multer.single('file'), bookController.createBook);

router.put('/:id', bookController.updateBook);

router.get('/:id/download', bookController.downloadBookFile);

router.delete('/:id', bookController.deleteBookWithFile);

router.delete('/delete/all', bookController.deleteAllBook);
export default router;