export default interface IBook {
    title: string;

    description: string;

    authors: string;

    favorite: boolean; // не забыть про false по умолчанию

    fileCover: string;

    fileName: string;
}