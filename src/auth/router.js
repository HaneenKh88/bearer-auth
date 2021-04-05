'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const Users = require('../models/users-model');
const Auth = require('../auth/middleware/basic')


const router = express.Router();

router.post('/signup',SignUpHandler);
router.post('/signin', Auth ,SignInHandler );


async function SignUpHandler (req,res)
{
    try {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = new Users({ username, password: hash });
        const record = await user.save();
        res.status(201).json(record);
      } catch (error) {
        res.status(403).json({ error: error.message });
      }
}

async function SignInHandler(req,res)
{
    
    
    try {
      const user = await Users.findOne({ username: req.user.username })
      const valid = await bcrypt.compare(req.user.password, user.password);
      if (valid) {
        res.status(200).json(user);
      }
      else {
        throw new Error('Invalid User')
      }
    } catch (error) { res.status(403).send("Invalid Login"); }
  
}
module.exports = router;