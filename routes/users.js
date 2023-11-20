const router = require("express").Router();
const userController = require("../controllers/users");

// router.get("/users", userController.readAllUsers);
// router.get("/users/:userId", userController.readUser);
// router.post("/users", userController.createUser);
router.get("/users", (req, res) => {
  console.log("routerGETall");
});
router.get("/users/:userId", (req, res) => {
  console.log("routerGETUserId");
});
router.post("/users", (req, res) => {
  console.log("routerPOST");
});

module.exports = router;
