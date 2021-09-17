const jwt = require('jsonwebtoken')

const User = require('../models/user-model')

const checkToken = (req, res, next) => {
  const tokenKey = process.env.TOKEN_KEY;

  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(' ')[1],
      tokenKey,
      async (err, payload) => {
        if (err) res.status(401).json({code: 401, msg: 'Не авторизованный пользователь'})
        else if (payload) {
          const user = await User.findOne({_id: payload.id}, '_id username email position avatar accessToken')

          if (!user){
            res.status(401).json({code: 401, msg: 'Не авторизованный пользователь'});
            return;
          }

          req.user = user
          next();
        }
      }
    )
  } else {
    res.status(401).json({code: 401, msg: 'Не авторизованный пользователь'})
  }
}

module.exports = checkToken