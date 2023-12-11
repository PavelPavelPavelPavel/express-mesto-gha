const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const authUser = require('../middlewares/auth');
const validateJwt = require('../utils/validation/jwtValidation');
const { NotFoundError } = require('../errors');
const {
  validateCreateUser,
  validateLogin,
} = require('../utils/validation/userValidation');
const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.use(validateJwt, authUser);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
