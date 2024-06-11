const Books = require('../../class/Book')
const { v4: uuid } = require('uuid');

const library = {
    booksInLibrary: [
        new Books(uuid(), 'Война и мир', 'Классика', 'Л.Н. Толстой', false, 'Бумага', 'some file name', 'path to file'),
        new Books(uuid(), 'Тихий дон', 'Классика', 'Шолохов М.А.', true, 'Картон', 'some file', 'path to file'),
        new Books(uuid(), 'Преступление и наказание', 'Классика', 'Ф.М. Достоевский', true, 'Пленка', 'some file', 'path to file'),
    ],
};

module.exports = library