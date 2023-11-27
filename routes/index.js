const router = require("express").Router();
const usersRouter = require("./users");
const cardsRouter = require("./cards");

router.use("/", usersRouter);
router.use("/cards", cardsRouter);

module.exports = router;
