import multer from 'multer';
import path from 'path';
import * as fs from 'fs';

const uploadPath = path.resolve('dist/db/fileBooks/');

// Создание директории перед загрузкой если ее нет
if (!fs.existsSync(uploadPath))
	fs.mkdirSync(uploadPath, { recursive: true });



const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, uploadPath);
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const UploadFile = multer({ storage });

export default UploadFile;
