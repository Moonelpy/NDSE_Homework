import dotenv from 'dotenv';

dotenv.config();

import passport from 'passport';
import express from 'express';
import session from 'express-session';
import path from 'path';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

import userRouter from './src/routes/mod/user';
import apiBooksRouter from './src/routes/api/book';
import modBooksRouter from './src/routes/mod/books';
import indexRouter from './src/routes';
import errorMiddleware from './src/middleware/error/404';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('database/fileBooks'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
// api внешние, mod внутрение
app.use('/mod/user', userRouter);
app.use('/api/books', apiBooksRouter);
app.use('/mod/books', modBooksRouter);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(errorMiddleware);

io.on('connection', (socket) => {
	const { id } = socket;
	console.log(`Socket connected: ${id}`);

	const { roomName } = socket.handshake.query;
	console.log(`Socket roomName: ${roomName}`);
	if (roomName) {
		socket.join(roomName);
		// Обработка события отправки комментария в комнату
		socket.on('message-to-room', (msg) => {
			msg.type = `room: ${roomName}`;
			socket.to(roomName).emit('message-to-room', msg);
			socket.emit('message-to-room', msg);
		});
	}
	// Обработка события отправки комментария
	socket.on('comment message', (msg) => {
		msg.type = `room: ${roomName}`;
		io.emit('comment message', `${msg.username}: ${msg.text}`);
	});

	// Отключение клиента
	socket.on('disconnect', () => {
		console.log(`Socket disconnected: ${id}`);
	});
});

const PORT = Number(process.env.PORT) || 3000;
const UrlDB = process.env.MONGO_URL || 'mongodb://root:password@mongo:27017/';

async function start(PORT, UrlDB) {
	try {
		await mongoose.connect(UrlDB);
		console.log('Mongo connected!');
		server.listen(PORT, () => {
			console.log(`Сервер запущен на порту ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
}

await start(PORT, UrlDB);
