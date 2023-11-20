const router = require("express").Router();
const usersRouter = require("./users");

router.use(usersRouter);

router.get("/", function (req, res) {
  res.status(200).send("hello world");
  console.log(req);
});

module.exports = router;
