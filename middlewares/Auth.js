const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const NotLoggedIn = async (req, res, next) => {
  const{authorization} = req.headers;

  // for not logged in only
  if (!authorization) {
    return res.status(401).send({
      error: true,
      msg: 'You don\'t have any active plan'
    });
  }

  // for logged in users only
  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.decode(token, process.env.TOKEN_SECRET);
    const user = await User.findById(payload._id);
    if (!user) return res.status(401).send({
      error: true,
      msg: 'You don\'t have any active plan'
    });
    req.user = user
  } catch (err) {
    return res.status(401).send({
      error: true,
      msg: 'You don\'t have any active plan.'
    });
  }
  next();
}

module.exports = {NotLoggedIn};