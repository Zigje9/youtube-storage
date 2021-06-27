const express = require('express');
const cookieParser = require('cookie-parser');
const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const indexRouter = require('./routes/index');

app.use(indexRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
