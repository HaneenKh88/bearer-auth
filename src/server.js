'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);


app.get('/', HomeHandler);

function  HomeHandler(req, res) 
 {
    res.send('Hello World');
 }

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports =
{
    server: app,
    startup: (port) => {
        const PORT = port || 3000;
        app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
};