import multer from 'multer';
import path from 'path';
import * as fs from 'fs';

const uploadPath = path.join(__dirname, '../db/fileBooks/');

// Создание директории перед загрузкой если ее нет
if (!fs.existsSync(uploadPath))
	fs.mkdirSync(uploadPath);


const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, uploadPath);
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;
