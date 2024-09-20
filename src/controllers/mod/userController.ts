import User from '../../models/User';
import { Request, Response, NextFunction } from 'express';

class userController {

	async singup(req: Request, res: Response) {
		try {
			const newUser = new User(req.body);
			await newUser.save();
			res.redirect('/');
		} catch (error) {
			console.log(error);
			res.status(500).send('Ошибка регистрации пользователя');
		}
	}

	renderSingup(req: Request, res: Response) {
		res.render('user/signup');
	}

	renderLogin(req: Request, res: Response) {
		res.render('user/login');
	}

	login(req: Request, res: Response) {
		console.log('req.user: ', req.user);
		res.redirect('/');
	}

	renderProfile(req: Request, res: Response) {
		res.render('user/profile', { user: req.user });
	}

	logout(req: Request, res: Response, next: NextFunction) {
		req.logout((err) => {
			if (err)
				return next(err);

			res.redirect('/');
		});
	}
}

export default new userController;
