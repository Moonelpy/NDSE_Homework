import { Request, Response } from 'express';
import axios from 'axios';
import Books from '../../models/Books';

const counterUrl = process.env.COUNTER_URL || 'http://counter:3001';

class bookController {
	renderCreateBook(req: Request, res: Response) {
		res.render('books/create', {
			title: 'Добавить книгу',
			books: {},
		});
	}

	async createBook(req: Request, res: Response) {
		try {
			const book = new Books(req.body);
			await book.save();
			res.redirect('/');
		} catch (err) {
			console.log(err);
			res.redirect('/create');
		}
	}

	async updateBook(req: Request, res: Response) {
		try {
			const { id } = req.params;

			await Books.findByIdAndUpdate(id, req.body);
			res.redirect('/');
		} catch (error) {
			console.log(error);
			res.redirect('/');
		}
	}

	async renderUpdateBook(req: Request, res: Response) {
		const { id } = req.params;
		const book = await Books.findById(id);

		if (book) {
			res.render('books/update', {
				title: 'Редактировать книгу',
				book: book.id,
			});
		} else {
			res.redirect('/404');
		}
	}

	async getBookPage(req: Request, res: Response) {
		const { id } = req.params;
		const book = await Books.findById(id);
		try {
			await axios.post(`${counterUrl}/counter/${book.id}/incr`);
			const response = await axios.get(`${counterUrl}/counter/${book.id}`);
			const getsCount = response.data.count;

			if (book) {
				res.render('books/view', {
					title: book.title,
					books: book,
					count: getsCount,
				});
			} else {
				res.redirect('/404');
			}
		} catch (error) {
			console.log(`Произошла ошибка запроса из Redis ${error}`);
			res.status(500).send('Произошла ошибка сервера');
			res.redirect('/');
		}
	}

	async deleteBook(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const book = await Books.findById(id);

			if (!book)
				return res.redirect('/404');



			await Books.findByIdAndDelete(id);
			res.redirect('/');
		} catch (error) {
			res.status(500).json({ error });
		}
	}
}

export default new bookController;
