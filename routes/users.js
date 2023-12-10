const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserInfo,
  updateUserAvatar,
  updateUserInfo,
  getUserById,
} = require('../controllers/users');
const {
  validateUpdateUserAvatar,
  validateUpdateUserInfo,
} = require('../utils/validation/userValidation');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.patch('/me', validateUpdateUserInfo, updateUserInfo);
usersRouter.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);
usersRouter.get('/:userId', getUserById);

module.exports = usersRouter;
