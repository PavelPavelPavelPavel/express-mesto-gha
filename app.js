const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {
  // eslint-disable-next-line no-console
  console.log('DB connected');
});
const app = express();
const { PORT = 3000 } = process.env;
const { checkServer } = require('./utils/responseCheck');
const appRouter = require('./routes');

app.use((req, res, next) => {
  req.user = {
    _id: '65607714c1fd133d56de1589',
  };
  next();
});
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(appRouter);

app.listen(PORT, () => {
  checkServer(PORT);
});
