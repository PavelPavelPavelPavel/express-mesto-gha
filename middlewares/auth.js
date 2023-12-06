const jwt = require('jsonwebtoken');
const { KEY_FOR_TOKEN } = require('../utils/config');
const userModel = require('../models/user');




function authUser(req, res, next) {
  //console.log(req.headers.authorization);
  //console.log(req.headers.cookie.split('=')[1]);
  // const myToken = req.headers;
  //const myToken = req.headers.cookie.split('=')[1];
  //console.log(myToken);

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'Forbiden' })
  }
  return jwt.verify(token, KEY_FOR_TOKEN, function (err, decoded) {
    return userModel.findById(decoded._id)
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: 'Пользователь не найден' })
        }
        req.user = { _id: user._id }
        next();
      })
      .catch(err => {
        setServerError(err, res)
      })
  })
}

module.exports = authUser;
