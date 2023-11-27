const userModel = require("../models/user");

function getAllUsers(req, res) {
  return userModel
    .find()
    .then((users) => {
      if (users) {
        console.log(users);
        return res.status(200).send(users);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Server error");
    });
}

function getUser(req, res) {
  return userModel
    .findById(`${req.params.userId}`)
    .then((user) => {
      if (user) {
        console.log(user);
        return res.status(200).send(user);
      }
      console.log("wrong ID");
      return res.status(404).send("Пользователь с таким ID не найден");
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log(err.message);
        return res.status(400).send("Invaild Id");
      }
      return res.status(500).send(err.name);
    });
}

function createUser(req, res) {
  const userData = req.body;
  return userModel
    .create(userData)
    .then((user) => {
      if (user) {
        return res.status(201).send(user);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send(err.message);
      }
      return res.status(500).send("Server Error");
    });
}

function updateInfo(req, res) {
  const userId = req.user._id;
  console.log(userId);
  const body = req.body;
  return userModel
    .findByIdAndUpdate(
      userId,
      {
        $set: {
          ...body,
        },
      },
      { new: true }
    )
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "SyntaxError") {
        console.log(res.message);
        return res.status(400).send("Данные введены не верно");
      }
      return res.status(500).send("Server Error");
    });
}

function updateUserInfo(req, res) {
  updateInfo(req, res);
}

function updateUserAvatar(req, res) {
  updateInfo(req, res);
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
