
class DataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ForbidenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class AlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}



module.exports = {
  NotFoundError,
  ForbidenError,
  DataError,
  AlreadyExistsError,
};
