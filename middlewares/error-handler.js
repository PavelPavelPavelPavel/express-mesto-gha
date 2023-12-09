function errorHandler(err, req, res, next) {
  if (err.statusCode) {
    console.log(err.stack)
    return res
      .status(err.statusCode)
      .send({
        message: err.message
      })
  } else {
    console.log(err.stack)
    return res
      .status(500)
      .send({
        message: 'Ошибка сервера'
      })
  }
}

module.exports = errorHandler;

