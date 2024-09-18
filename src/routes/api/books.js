import Books from '../../models/Books';
import { container } from '../../config/container';
import { BooksRepositoryImpl } from '../../classes/BooksRepositoryImpl';

require('dotenv').config();
const path = require('path');

const express = require('express');

const router = express.Router();

const fs = require('fs');
const axios = require('axios');
const upload = require('../../middleware/fileUpload');

const counterUrl = process.env.COUNTER_URL || 'http://counter:3001';

// Получение всех книг
router.get('/', async (req, res) => {
  const bookContainer = container.get(BooksRepositoryImpl);
  const newBook = await bookContainer.createBook(req.body);
  if (newBook) {
    res.json(newBook);
  } else {
    res.json('Не удалось получить книги');
  }
});
// Получение одной книги по id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const bookContainer = container.get(BooksRepositoryImpl);
  const newBook = await bookContainer.getBook(id);

  if (!newBook) {
    res.status(404).send();
  } else {
    const howMany = await axios.post(`${counterUrl}/counter/${id}/incr`);
    res.json({ ...newBook, count: howMany.data.count });
  }
});

// Добавление новой книги с загрузкой файла
router.post('/', upload.single('file'), async (req, res) => {
  const book = new Books({
    title: req.body.title,
    description: req.body.description,
    authors: req.body.authors,
    fileCover: req.body.fileCover,
    favorite: false,
    fileName: req.file.filename,
  });

  const bookContainer = container.get(BooksRepositoryImpl);
  const newBook = await bookContainer.createBook(book); // Здесь приведение кривой исправлится когда перепишу на ts
  if (newBook) {
    res.status(201).json(newBook);
  } else {
    res.status(500).json({ message: 'Не удалось создать книгу' });
  }
});

// Обновление информации о книге
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const bookContainer = container.get(BooksRepositoryImpl);
  const newBook = await bookContainer.updateBook(id, req.body);
  if (!newBook) {
    res.status(404).json({ error: 'Книга не найдена' });
  } else {
    res.json(newBook);
  }
});

// Скачивание файла книги по ее id (не из ДЗ по контейнерам не правилось)
router.get('/:id/download', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    if (book) {
      const filePath = path.join(__dirname, '../../db/fileBooks', path.basename(book.fileName));
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
});

// Удаление книги с файлом
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const bookContainer = container.get(BooksRepositoryImpl);
  const findBook = await bookContainer.getBook(id);
  if (findBook) {
    await bookContainer.deleteBook(id);
    const filePath = path.join(__dirname, '../../db/fileBooks', path.basename(findBook.fileName));
    await fs.unlink(filePath, async (err) => {
      if (err) {
        console.error('Ошибка при удалении файла: ', err);
        return res.status(500).json({ message: 'Ошибка при удалении файла', error: err.message });
      }
    });
    res.status(200).json({ message: 'Книга успешно удалена' });
  } else {
    res.status(500).json({ message: 'Ошибка удаления книги' });
  }
});

// Удаление всех книг что бы чистить БД(для отладки)
// router.delete('/', async (req, res) => {
//     await Books.deleteMany();
//     res.send('Успех!')
// });

module.exports = router;
