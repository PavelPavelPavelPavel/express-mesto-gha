const usersRouter = require('express').Router();
const userController = require('../controllers/users');
const authUser = require('../middlewares/auth');



usersRouter.post('/signup', userController.createUser);
usersRouter.post('/signin', userController.login);
usersRouter.use(authUser);
usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/me', userController.getUserInfo);
usersRouter.patch('/me', userController.updateUserInfo);
usersRouter.patch('/me/avatar', userController.updateUserAvatar);
usersRouter.get('/:userId', userController.getUserById);

module.exports = usersRouter;
