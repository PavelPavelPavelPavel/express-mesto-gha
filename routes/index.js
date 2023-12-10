const router = require('express').Router();
const { errors } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const errorHandler = require('../middlewares/error-handler');
const authUser = require('../middlewares/auth');
const validateJwt = require('../utils/validation/jwtValidation');
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
router.use(errors());
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});

router.use(errorHandler);

module.exports = router;
