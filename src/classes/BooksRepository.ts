import { injectable } from 'inversify';
import { IBook } from '../interface/IBook';
import mongoose from 'mongoose';

type IBookDoc = IBook & mongoose.Document

@injectable()
export abstract class BooksRepository {
	abstract createBook(book: IBook): Promise<IBookDoc | null>;

	abstract getBook(id: string): Promise<IBookDoc | null>;

	abstract getBooks(): Promise<IBookDoc[]>;

	abstract updateBook(id: string, book: IBook): Promise<IBookDoc | null>

	abstract deleteBook(id: string): Promise<IBookDoc | null>
}
