function errorHandler(err, req, res) {
  if (err.statusCode) {
    console.log(err.stack);
    return res
      .status(err.statusCode)
      .send({
        message: err.message,
      });
  }
  console.log(err.stack);
  return res
    .status(500)
    .send({
      message: 'Ошибка сервера',
    });
}

module.exports = errorHandler;
