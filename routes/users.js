const usersRouter = require('express').Router();
const userController = require('../controllers/users');

usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:userId', userController.getUser);
usersRouter.post('/', userController.createUser);
usersRouter.patch('/me', userController.updateUserInfo);
usersRouter.patch('/me/avatar', userController.updateUserAvatar);

module.exports = usersRouter;
