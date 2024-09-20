import { Request, Response } from 'express';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import Books from '../../models/Books.ts';
import { container } from '../../config/container';
import { BooksRepositoryImpl } from '../../classes/BooksRepositoryImpl.ts';
import { IBook } from '../../interface/IBook.ts';

const counterUrl = process.env.COUNTER_URL || 'http://counter:3001';

class BookController {
	// Получение всех книг
	async getBooks(req: Request, res: Response) {
		const bookContainer = container.get(BooksRepositoryImpl);
		const newBook: IBook[] = await bookContainer.getBooks();

		if (newBook) {
			res.json(newBook);
		} else {
			res.json({ message: 'Не удалось получить книги' });
		}


	}

	// Получение одной книги по id
	async getBookById(req: Request, res: Response) {
		const { id } = req.params;
		const bookContainer = container.get(BooksRepositoryImpl);
		const newBook = await bookContainer.getBook(id);

		if (!newBook) {
			res.status(404).send();
		} else {
			const howMany = await axios.post(`${counterUrl}/counter/${id}/incr`);
			res.json({ ...newBook, count: howMany.data.count });
		}
	}

	// Добавление новой книги с загрузкой файла
	async createBook(req: any, res: Response) {
		const bookContainer = container.get(BooksRepositoryImpl);
		const newBook = await bookContainer.createBook(req.body);
		if (newBook) {
			res.status(201).json(newBook);
		} else {
			res.status(500).json({ message: 'Не удалось создать книгу' });
		}


		// const book = new Books({
		//   title: req.body.title,
		//   description: req.body.description,
		//   authors: req.body.authors,
		//   fileCover: req.body.fileCover,
		//   favorite: false,
		//   fileName: req.file.filename,
		// });
	}

	async updateBook(req: Request, res: Response) {
		const { id } = req.params;

		const bookContainer = container.get(BooksRepositoryImpl);
		const newBook = await bookContainer.updateBook(id, req.body);
		if (!newBook) {
			res.status(404).json({ error: 'Книга не найдена' });
		} else {
			res.json(newBook);
		}


	}

	async downloadBookFile(req: Request, res: Response) {
		try {
			const filename = req.file?.filename;
			let filePath;
			const { id } = req.params;

			const book = await Books.findOne(id);
			if (book && filename) {
				filePath = path.join(__dirname, '../../db/fileBooks', path.basename(filename));
				res.download(filePath, (error) => {
					if (error) {
						console.error('Ошибка при скачивании файла: ', error);
						res.status(500).json('Ошибка при скачивании файла');
					}
				});
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteBookWithFile(req: Request, res: Response) {
		const { id } = req.params;

		const bookContainer = container.get(BooksRepositoryImpl);
		const findBook = await bookContainer.getBook(id);
		if (findBook) {
			await bookContainer.deleteBook(id);
			let filePath;
			if (findBook.fileName != null) {
				filePath = path.join(__dirname, '../../db/fileBooks', path.basename(findBook.fileName));
			}


			fs.unlink(filePath, async (err) => {
				if (err) {
					console.error('Ошибка при удалении файла: ', err);
					return res.status(500).json({ message: 'Ошибка при удалении файла', error: err.message });
				}
			});
			res.status(200).json({ message: 'Книга успешно удалена' });
		} else {
			res.status(500).json({ message: 'Ошибка удаления книги' });
		}
	}

	async deleteAllBook(req: Request, res: Response) {
		await Books.deleteMany();
		res.send('Успех!');
	}
}

export default new BookController();
