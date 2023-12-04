const usersRouter = require('express').Router();
const userController = require('../controllers/users');


usersRouter.post('/signup', userController.createUser);
usersRouter.post('/signin', userController.login);
usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:userId', userController.getUser);
usersRouter.patch('/me', userController.updateUserInfo);
usersRouter.patch('/me/avatar', userController.updateUserAvatar);

module.exports = usersRouter;
