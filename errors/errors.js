function setServerError(err, res) {
  console.log(err.message);
  console.log(err.name);
  return res.status(500).send({ message: "Сервер не отвечает" });
}

function setWrongData(err, res) {
  console.log(err.message);
  console.log(err.name);
  return res.status(400).send({ message: "Введены некорректные данные" });
}

function setDataNotFound(message, err, res) {
  console.log(err.name);
  console.log(err.name);
  return res.status(404).send({ message: message });
}

module.exports = {
  setServerError,
  setWrongData,
  setDataNotFound,
};
