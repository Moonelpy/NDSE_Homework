import "reflect-metadata"
import {injectable} from "inversify";
import {BooksRepository} from "./BooksRepository";
import {IBook} from "../interface/IBook";
import Book from "../models/Books"
import * as mongoose from "mongoose";

@injectable()
export class BooksRepositoryImpl extends BooksRepository {

    public async createBook(book: IBook): Promise<IBook | null> {
        try {
            const newBook = new Book(book);
            await newBook.save();
            return newBook;
        } catch (err) {
            console.log('Ошибка создания книги', err);
            return null
        }
    }

    public async getBook(id: string): Promise<IBook | null> {
        try {
            const book = await Book.findById(id);
            return book;
        } catch (err) {
            console.log('Ошибка получения книги')
            return null
        }
    }

    public async getBooks(): Promise<IBook[]> {
        try {
            const books = await Book.find({});
            return books
        } catch (err) {
            console.log('Ошибка получения списка книг', err)
            return []
        }
    }

    public async updateBook(id: string, book: IBook): Promise<IBook | null> {
        try {
            const updateBook = await Book.findByIdAndUpdate(id, book, {new: true});
            return updateBook;
        } catch (err) {
            console.log('Ошибка редактирования книги', err);
            return null
        }
    }

    public async deleteBook(id: string): Promise<IBook | null> {
        try {
            await Book.findByIdAndDelete(id, {new: true});
        } catch (err) {
            console.log('Ошибка при удалении книги', err);
            return null
        }
    }
}