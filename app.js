const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
mongoose.connect("mongodb://localhost:27017/mestodb").then(() => {
  console.log("DB connected");
});
const app = express();
const { PORT = 3000, BASE_PATH } = process.env;
const { checkServer } = require("./utils/responseCheck");
const appRouter = require("./routes");
const userModel = require("./models/user");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(appRouter);
// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.post("/users", (req, res) => {
//   const userData = req.body;

//   userModel
//     .create(userData)
//     .then((user) => {
//       return res.status(201).send(user);
//     })
//     .catch((err) => {
//       return res.status(400).send(err.message);
//     });
// });

app.listen(PORT, function () {
  checkServer(PORT);
  //console.log(BASE_PATH);
});
