const SALT = 10;
const KEY_FOR_TOKEN = 'abrakadabra123';
const avatarRegex = /(http(s?):\/\/)(w{3}\.)?([\w\d\W\D]*)(\w?)[#]?/;

module.exports = {
  SALT,
  KEY_FOR_TOKEN,
  avatarRegex,
};
