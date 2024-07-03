require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const Books = require('../../models/Books');
const counterUrl = process.env.COUNTER_URL || 'http://counter:3001';


//Получить книгу для добавления
router.get('/create', (req, res) => {
    res.render('books/create', {
        title: "Добавить книгу",
        books: {}
    });
});

//Добавление новой книги
router.post('/create', async (req, res) => {
    const book = new Books({
        title: req.body.title,
        description: req.body.description,
        authors: req.body.authors,
        fileCover: req.body.fileCover,
        fileName: req.body.fileName
    });

    await book.save();
    res.redirect('/');
});
// Получение одной книги по id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Books.findById(id);
    try {
        await axios.post(`${counterUrl}/counter/${book.id}/incr`);
        const response = await axios.get(`${counterUrl}/counter/${book.id}`);
        const getedCount = response.data.count;

        if (book) {
            res.render("books/view", {
                title: book.title,
                books: book,
                count: getedCount
            });
        } else {
            res.redirect('/404');
        }
    } catch (error) {
        console.log(`Произошла ошибка запроса из Redis ${error}`);
        res.status(500).send('Произошла ошибка сервера');
        res.redirect('/');
    }

});
//Получить книгу для обновления
router.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Books.findById(id);

    if (book) {
        res.render('books/update', {
            title: "Редактировать книгу",
            book: book.id
        });
    } else {
        res.redirect("/404");
    }
});
//Обновить книгу
router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await Books.findByIdAndUpdate(id, {
            ...req.body
        }),
    res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

});
// Удаление книги
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Books.findById(id);

        if (!book) {
            return res.redirect('/404');
        }

        await Books.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
