const multer = require('multer');
const path = require('path')
const fs = require('fs');

const uploadPath = path.join(__dirname, '../db/fileBooks/');

//Создание директории перед загрузкой если ее нет
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadPath);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
module.exports = upload