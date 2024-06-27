require('dotenv').config();
const path = require('path');

const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const Books = require('../../models/Books');
const library = require('../../db/collections/library');
const upload = require('../../middleware/fileUpload');
const fs = require("fs");
const axios = require("axios");
const counterUrl = process.env.COUNTER_URL || 'http://counter:3001';

// Получение всех книг
router.get('/', async (req, res) => {
    try {
        const book = await Books.find();
        res.json(book);
    } catch (error) {
        res.json({ error: error });
    }

});
// Получение одной книги по id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Books.findById(id);

    if (!book) {
        res.status(404).send();
    } else {
        const howMany = await axios.post(`${counterUrl}/counter/${id}/incr`);
        res.json({ ...book.toObject(), count: howMany.data.count });
    }
});
//Добавление новой книги с загрузкой файла
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const book = new Books({
            title: req.body.title,
            description: req.body.description,
            authors: req.body.authors,
            fileCover: req.body.fileCover,
            favorite: false,
            fileName: req.file.filename
        });

        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Обновление информации о книге
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Books.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!book) {
            res.status(404).json({ error: 'Книга не найдена' });
        } else {
            res.json(book);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Скачивание файла книги по ее id
router.get('/:id/download', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Books.findById(id);
        if (book) {
            const filePath = path.join(__dirname, '../../db/fileBooks', path.basename(book.fileName));
            res.download(filePath, (error) => {
                if (error) {
                    console.error('Ошибка при скачивании файла: ', error);
                    res.status(500).json("Ошибка при скачивании файла");
                }
            });
        };
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Удаление книги
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Books.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Книга не найдена' });
        }

        await Books.findByIdAndDelete(id);
        const filePath = path.join(__dirname, '../../db/fileBooks', path.basename(book.fileName));
        await fs.unlink(filePath, async (err) => {
            if (err) {
                console.error('Ошибка при удалении файла: ', err);
                return res.status(500).json({ message: 'Ошибка при удалении файла', error: err.message });
            }
        });
        res.status(200).json({ message: 'Книга успешно удалена' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Удаление всех книг что бы чистить БД(для отладки)
// router.delete('/', async (req, res) => {
//     await Books.deleteMany();
//     res.send('Успех!')
// });

module.exports = router;
