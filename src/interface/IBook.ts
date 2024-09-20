export interface IBook {
	title: string;

	description: string;

	authors: string;

	favorite?: boolean | undefined;

	fileCover?: string | undefined;

	fileName?: string | undefined;

	fileBook?: string | undefined;
}
