require('dotenv').config();
const express = require('express');
const app = express();

const AuthRouter = require('./routes/auth');
const BooksRouter = require('./routes/books');

app.use(express.json());
app.use('/api/user', AuthRouter);
app.use('/api/books', BooksRouter);
app.use(express.static("database/fileBooks"));
app.use((req, res, next) => {
    res.status(404).send('Маршрут не найден');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
