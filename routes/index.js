const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const errorHandler = require('../middlewares/error-handler');


router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена.' });
});
router.use(errorHandler);

module.exports = router;
