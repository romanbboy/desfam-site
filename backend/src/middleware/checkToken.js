const jwt = require('jsonwebtoken')

const User = require('../models/user-model')

const checkToken = (req, res, next) => {
  const tokenKey = '192.168.0.117';

  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      tokenKey,
      async (err, payload) => {
        if (err) res.status(401).json(['Не авторизованный пользователь'])
        else if (payload) {
          const user = await User.findOne({_id: payload.id}, '_id username email position avatar accessToken')

          if (!user){
            res.status(401).json(['Не авторизованный пользователь']);
            return;
          }

          req.user = user
          next();
        }
      }
    )
  } else {
    res.status(401).json(['Не авторизованный пользователь'])
  }
}

module.exports = checkToken