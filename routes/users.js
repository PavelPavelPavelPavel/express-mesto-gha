const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserInfo,
  updateUserAvatar,
  updateUserInfo,
  getUserById,
} = require('../controllers/users');
const {
  validateUserAvatar,
  validateUpdateUserInfo,
  validateIdUser,
} = require('../utils/validation/userValidation');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', validateUpdateUserInfo, updateUserInfo);
usersRouter.patch('/me/avatar', validateUserAvatar, updateUserAvatar);
usersRouter.get('/:userId', validateIdUser, getUserById);

module.exports = usersRouter;
