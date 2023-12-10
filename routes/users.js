const usersRouter = require('express').Router();
const authUser = require('../middlewares/auth');
const {
  createUser,
  login,
  getAllUsers,
  getUserInfo,
  updateUserAvatar,
  updateUserInfo,
  getUserById,
} = require('../controllers/users');
const {
  validateCreateUser,
  validateLogin,
} = require('../utils/validation/userValidation');
const validateJwt = require('../utils/validation/jwtValidation');

usersRouter.post('/signup', validateCreateUser, createUser);
usersRouter.post('/signin', validateLogin, login);
usersRouter.use(validateJwt, authUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', updateUserInfo);
usersRouter.patch('/me/avatar', updateUserAvatar);
usersRouter.get('/:userId', getUserById);

module.exports = usersRouter;
