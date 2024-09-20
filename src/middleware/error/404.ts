import { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
	res.render('errors/404', {
		title: '404 | Не найдено',
	});
};

export default notFound;
