const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const appRouter = require('./routes');



mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {
  // eslint-disable-next-line no-console
  console.log('DB connected');
});
const app = express();
const {
  PORT = 3000,
} = process.env;
const { checkServer } = require('./utils/responseCheck');


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(appRouter);



app.listen(PORT, () => {
  checkServer(PORT);
});
