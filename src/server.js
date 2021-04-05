'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// require('dotenv').config();
// const users = require('./models/users-model');
const userRouter = require('../src/auth/router')

const notFoundHndler = require('../src/middleware/404');
const errorHandler = require('../src/middleware/500');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/', userRouter);

function homeHandler(req, res) {
    res.send('Hello World');
}

app.get('/', homeHandler);


app.use('*', notFoundHndler);
app.use(errorHandler);

module.exports =
{
    server: app,
    start: (port) => {
        const PORT = port || 3000;
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
};