const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
mongoose.connect("mongodb://localhost:27017/mestodb");
const app = express();
const { PORT = 3000, BASE_PATH } = process.env;
const { checkServer } = require("./utils/responseCheck");
const appRouter = require("./routes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(appRouter);

app.listen(PORT, function () {
  checkServer(PORT);
  //console.log(BASE_PATH);
});
