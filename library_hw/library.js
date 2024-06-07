require('dotenv').config();
const { v4: uuid } = require('uuid');
const express = require('express');
const app = express();
app.use(express.json());

//app.use(express.urlencoded({ extended: true }));

class Books {
    constructor(
        id = uuid(),
        title = String,
        description = String,
        authors = String,
        favorite = String,
        fileCover = String,
        fileName = String
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}
const library = {
    booksInLibrary: [
        new Books(uuid(), 'Война и мир', 'Классика', 'Л.Н. Толстой'),
        new Books(uuid(), 'Тихий дон', 'Классика', 'Шолохов М.А.'),
        new Books(uuid(), 'Преступление и наказание', 'Классика', 'Ф.М. Достоевский'),
    ],
};

app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
    const { booksInLibrary } = library;
    res.json(booksInLibrary);
});

app.get('/api/books/:id', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const idx = booksInLibrary.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(booksInLibrary[idx]);
    }
    else {
        res.status(404).send();
    }
});

app.post('/api/books', (req, res) => {
    const { booksInLibrary } = library;
    const { title, description, authors } = req.body;

    const newBook = new Books(uuid(), title, description, authors);
    booksInLibrary.push(newBook);
    res.json(newBook);

});
app.put('/api/books/:id', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const { title, description, authors } = req.body;
    const idx = booksInLibrary.findIndex(el => el.id === id);

    if (idx !== -1) {
        booksInLibrary[idx] = {
            ...booksInLibrary[idx],
            title,
            description,
            authors
        };
        res.json(booksInLibrary[idx]);
    }
    else {
        res.status(404).send();
    }
});

app.delete('/api/books/:id', (req, res) => {
    const { booksInLibrary } = library;
    const { id } = req.params;
    const idx = booksInLibrary.findIndex(el => el.id === id);

    if (idx !== -1) {
        booksInLibrary.splice(idx, 1);
        res.json('ok');
    }

});
const PORT = process.env.PORT || 3000;
app.listen(PORT);
