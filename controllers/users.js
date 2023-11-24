const userModel = require("../models/user");

function getAllUsers(req, res) {
  console.log("controllers/users/getAllUsers");
  res.send("hello world two");
}

function getUser(req, res) {
  console.log("controllers/users/getUser");
}

function createUser(req, res) {
  console.log("controllers/users/createUser");
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
};
