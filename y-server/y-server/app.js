const express = require('express');

const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const fileRouter = require('./routes/file');
const searchRouter = require('./routes/search');
const blobRouter = require('./routes/blob');

app.use(fileRouter);
app.use(searchRouter);
app.use(blobRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
