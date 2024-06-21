require('dotenv').config();
const { v4: uuid } = require('uuid');
const express = require('express');
const router = express.Router();
const axios = require('axios')

const Book = require('../../model/Book');
const library = require('../../db/collections/library');
const counterUrl = process.env.COUNTER_URL || 'http://counter:3001'
//Получить книгу для добавления
router.get('/create', (req, res) => {
    res.render('books/create', {
        title: "Добавить книгу",
        books: {}
    });
});
//Добавление новой книги
router.post('/create', (req, res) => {
    const { booksInLibrary } = library;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;


    const newBook = new Book(uuid(), title, description, authors, favorite, fileCover, fileName);
    booksInLibrary.push(newBook)
    res.redirect('/');
});
// Получение одной книги по id
router.get('/:id', async (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const idx = booksInLibrary.findIndex((el) => el.id === id);
    try {
        await axios.post(`${counterUrl}/counter/${booksInLibrary[idx].id}/incr`)
        const response = await axios.get(`${counterUrl}/counter/${booksInLibrary[idx].id}`)
        const getedCount = response.data.count;

        if (idx !== -1) {
            res.render("books/view", {
                title: booksInLibrary[idx].title,
                books: booksInLibrary[idx],
                count: getedCount
            });
        } else {
            res.redirect('/404')
        }
    } catch (error) {
        console.log(`Произошла ошибка запроса из Redis ${error}`);
        res.status(500).send('Произошла ошибка сервера');
    }

});
//Получить книгу для обновления
router.get('/update/:id', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const idx = booksInLibrary.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.render('books/update', {
            title: "Редактировать книгу",
            book: booksInLibrary[idx]
        });
    } else {
        res.redirect("/404");
    }
});
//Обновить книгу
router.post('/update/:id', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const idx = booksInLibrary.findIndex((el) => el.id === id);

    booksInLibrary[idx] = {
        ...booksInLibrary[idx],
        ...req.body,
    }
    res.redirect('/')
});
// Удаление книги
router.post('/delete/:id', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const idx = booksInLibrary.findIndex((el) => el.id === id);

    if (idx !== -1) {
        booksInLibrary.splice(idx, 1);
        res.redirect('/')
    } else {
        res.redirect('/404');   
    }
});

module.exports = router;
