import express from 'express';
import userController from '../../controllers/mod/userController';
import passport from 'passport';
import hasAuth from '../../middleware/hasAuth';

const router = express.Router();

router.post('/signup', userController.singup);

router.get('/signup', userController.renderSingup);

router.get('/login', userController.renderLogin);

router.post('/login', passport.authenticate('local', {
	failureRedirect: '/mod/user/login',
}), userController.login);

router.get('/me', hasAuth, userController.renderProfile);

router.get('/logout', userController.logout);

export default router;
