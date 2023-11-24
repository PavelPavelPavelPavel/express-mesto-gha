const usersRouter = require("express").Router();
const userController = require("../controllers/users");

usersRouter.get("/", userController.getAllUsers);
usersRouter.get("/users/:userId", userController.getUser);
usersRouter.post("/users", userController.createUser);
// router.get("/users", (req, res) => {
//   console.log("express GET");
//   console.log(res.status);
// });
// router.get("/users/:userId", (req, res) => {
//   console.log("express GET User");
// });
// router.post("/users", (req, res) => {
//   console.log("express POST");
// });

module.exports = usersRouter;
