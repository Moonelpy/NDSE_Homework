require("dotenv").config();
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const authRouter = require('./src/routes/api/auth');
const apiBooksRouter = require('./src/routes/api/books');
const modBooksRouter = require('./src/routes/mod/books');
const indexRouter = require('./src/routes/index')
const errorMiddleware = require('./src/middleware/error/404')
const app = express();

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

const PORT = Number(process.env.PORT) || 3000;
const UrlDB = process.env.MONGO_URL || 'mongodb://root:password@mongo:27017/'
async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB).then(() => console.log("Mongo connected!"));
        app.listen(PORT)
        console.log(`Сервер запущен на порту ${PORT}`)
    } catch (e) {
        console.log(e);
    }
}

start(PORT, UrlDB)