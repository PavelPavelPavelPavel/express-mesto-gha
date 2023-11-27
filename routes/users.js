const usersRouter = require("express").Router();
const userController = require("../controllers/users");

usersRouter.get("/", userController.getAllUsers);
usersRouter.get("/users/:userId", userController.getUser);
usersRouter.post("/users", userController.createUser);
usersRouter.patch("/users/me", userController.updateUserInfo);
usersRouter.patch("/users/me/avatar", userController.updateUserAvatar);

module.exports = usersRouter;
