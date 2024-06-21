require('dotenv').config();
const { v4: uuid } = require('uuid');

const express = require('express');
const router = express.Router();

const Book = require('../../model/Book');
const library = require('../../db/collections/library');
const upload = require('../../middleware/fileUpload');
const fs = require("fs");

// Получение всех книг
router.get('/', (req, res) => {
    const { booksInLibrary } = library;
    res.json(booksInLibrary);
});
// Получение одной книги по id
router.get('/:id', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const idx = booksInLibrary.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.json(booksInLibrary[idx]);
    } else {
        res.status(404).send();
    }
});
//Добавление новой книги с загрузкой файла
router.post('/', upload.single('file'), (req, res) => {
    const { booksInLibrary } = library;
    const { title, description, authors, favorite, fileCover } = req.body;
    const fileName = req.file ? req.file.originalname : '';
    const fileBook = req.file ? req.file.path : '';


    const newBook = new Book(uuid(), title, description, authors, favorite, fileCover, fileName, fileBook );
    booksInLibrary.push(newBook);
    res.status(201).json(newBook);
});
//Обновление информации о книге
router.put('/:id', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const { title, description, authors } = req.body;
    const idx = booksInLibrary.findIndex((el) => el.id === id);

    if (idx !== -1) {
        booksInLibrary[idx] = {
            ...booksInLibrary[idx],
            title,
            description,
            authors,
        };
        res.json(booksInLibrary[idx]);
    } else {
        res.status(404).send('Книга не найдена');
    }
});
// Скачивание файла книги по ее id
router.get('/:id/download', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const idx = booksInLibrary.findIndex((el) => el.id === id);

    // Проверка на существование id
    if (idx !== -1) {
        const filePath = booksInLibrary[idx].fileBook;

        // Проверка на существование пути к файлу
        if (fs.existsSync(filePath)) {
            res.download(filePath, booksInLibrary[idx].fileName, (error) => {
                if (error) {
                    console.error('Ошибка при скачивании файла: ', error);
                    res.status(500).json("Ошибка при скачивании файла");
                }
            });
        }
    } else {
        res.status(404).send('Файл не найден');
    }
});

// Удаление книги
router.delete('/:id', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const idx = booksInLibrary.findIndex((el) => el.id === id);

    if (idx !== -1) {
        booksInLibrary.splice(idx, 1);
        res.json('ok');
    } else {
        res.status(404).send('Книга не найдена');
    }
});

module.exports = router;
