'use strict';

const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => {
    require('./src/server.js').startup(process.env.PORT);
})
.catch((error)=>{
    console.log('error with connected',error.message)
})