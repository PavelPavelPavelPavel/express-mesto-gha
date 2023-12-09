const jwt = require('jsonwebtoken');
const { KEY_FOR_TOKEN } = require('../utils/config');
const userModel = require('../models/user');
const { NotFoundError, ForbidenError } = require('../errors');




function authUser(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    next(new ForbidenError('Нет доступа'))
  }
  return jwt.verify(token, KEY_FOR_TOKEN, function (err, decoded) {
    return userModel.findById(decoded._id)
      .then(user => {
        console.log(user)
        if (!user) {
          next(new NotFoundError('Нет пользователя с таким id'))
        }
        req.user = { _id: user._id }
        next();
      })
      .catch(next)
  })
}

module.exports = authUser;
