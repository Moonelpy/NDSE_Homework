import express from 'express';
import Book from '../models/Books';

const router = express.Router();

router.get('/', async (req, res) => {
	const books = await Book.find();
	res.render('index', {
		title: 'Библиотека',
		books,
		user: req.user,
	});
});

export default router;
