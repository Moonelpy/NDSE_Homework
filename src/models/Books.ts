import mongoose from 'mongoose';

const BooksSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	authors: { type: String, required: true },
	favorite: { type: Boolean, default: false },
	fileCover: { type: String },
	fileName: { type: String },
	fileBook: { type: String },
});

const Book = mongoose.model('Book', BooksSchema);
export default Book;
