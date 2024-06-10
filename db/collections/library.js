const Books = require('../../class/Book')
const { v4: uuid } = require('uuid');

const library = {
    booksInLibrary: [
        new Books(uuid(), 'Война и мир', 'Классика', 'Л.Н. Толстой', 'Нет', 'Бумага', 'some file'),
        new Books(uuid(), 'Тихий дон', 'Классика', 'Шолохов М.А.', 'Нет', 'Картон', 'some file'),
        new Books(uuid(), 'Преступление и наказание', 'Классика', 'Ф.М. Достоевский', 'Да', 'Пленка', 'some file'),
    ],
};

module.exports = library