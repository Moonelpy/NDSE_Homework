import IBook from '../interface/IBook';


abstract class BooksRepository {
    abstract createBook(book: IBook): Promise<void>;

    abstract getBook(id: string):Promise<IBook | null>;

    abstract getBooks():Promise<IBook[]>;

    abstract updateBook(id: string):Promise<void>

    abstract deleteBook(id:string):Promise<void>
}