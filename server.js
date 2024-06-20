require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const authRouter = require('./src/routes/api/auth');
const apiBooksRouter = require('./src/routes/api/books');
const modBooksRouter = require('./src/routes/mod/books');
const indexRouter = require('./src/routes/index')
const errorMiddleware = require('./src/middleware/error/404')

app.use(express.static("database/fileBooks"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
// api внешние, mod внутрение
app.use('/api/user', authRouter);
app.use('/api/books', apiBooksRouter); 
app.use('/mod/books', modBooksRouter);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(errorMiddleware);

// Тут Number иначе не запускает и пишет что порт занят
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
