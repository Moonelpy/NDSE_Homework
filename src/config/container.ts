import 'reflect-metadata';
import { Container } from 'inversify';
import { BooksRepositoryImpl } from '../classes/BooksRepositoryImpl';

const container = new Container();

container.bind(BooksRepositoryImpl).toSelf();

export { container };
