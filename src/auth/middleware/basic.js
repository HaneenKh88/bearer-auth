'use strict';

const base64 = require('base-64');
const Users = require('../models/users');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization === 'Basic') {
    next('Invalid Login');
    return;
  }

  let basic = req.headers.authorization.split(' ').pop();
    let [username, password] = base64.decode(basic).split(':');
  try {
    
    console.log('__USERNAME&PASSWORD__', username, password);
    const validUser = await Users.authenticateBasic(username, password);
    console.log('__VALID_USER__', validUser);
    req.user = validUser;
    console.log(validUser);
    next();
  } catch (e) {
    next('Invalid Login');
  }
};
