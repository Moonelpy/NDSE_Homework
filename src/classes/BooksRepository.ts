import { injectable } from 'inversify';
import { IBook } from '../interface/IBook';

@injectable()
export abstract class BooksRepository {
	abstract createBook(book: IBook): Promise<IBook | null>;

	abstract getBook(id: string): Promise<IBook | null>;

	abstract getBooks(): Promise<IBook[]>;

	abstract updateBook(id: string, book: IBook): Promise<IBook | null>

	abstract deleteBook(id: string): Promise<IBook | null>
}
