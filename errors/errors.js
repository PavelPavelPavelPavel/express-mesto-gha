function setServerError(err, res) {
  console.log(err.name);
  console.log(err.message);
  return res.status(500).send({ message: 'Сервер не отвечает' });
}

function setWrongEmailOfPassError(err, res) {
  return res.status(401).send({ message: 'Введены неверный имейл или пароль' });
}

function setWrongData(err, res) {
  console.log(err.name);
  console.log(err.message);
  return res.status(400).send({ message: 'Введены некорректные данные' });
}

function setDataNotFound(message, res) {
  return res.status(404).send({ message });
}

module.exports = {
  setServerError,
  setWrongData,
  setDataNotFound,
  setWrongEmailOfPassError,
};
