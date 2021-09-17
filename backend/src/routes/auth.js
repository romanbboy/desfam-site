const {Router} = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const User = require('../models/user-model')

const router = Router();

router.post('/registration', (req, res) => {
  
  // Шифруем пароль
  const hash = crypto.createHmac('sha256', req.body.password);
  const hashPassword = hash.update('desfam').digest('hex');

  // Секретный ключ для JWT
  const tokenKey = '192.168.0.117';

  // Добавляем в БД
  const {username, email} = req.body

  const user = new User({username, email, password: hashPassword})

  user.save((err, data) => {
    if (err) {
      if (err.code === 11000 && err.keyValue.email) {
        res.status(400).json(['Такой email уже существует'])
      } else {
        res.status(400).json(['Неизвестная ошибка'])
      }
    }
    else {
      const accessToken = jwt.sign({id: user._id}, tokenKey);

      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        position: user.position,
        avatar: user.avatar,
        accessToken
      })
    }
  })
});

router.post('/login',  async (req, res) => {

  // Шифруем пароль
  const hash = crypto.createHmac('sha256', req.body.password);
  const hashPassword = hash.update('desfam').digest('hex');

  const user = await User.findOne({email: req.body.email, password: hashPassword}).exec();

  if (user) {
    // Секретный ключ для JWT
    const tokenKey = '192.168.0.117';
    const accessToken = jwt.sign({id: user._id}, tokenKey);

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      position: user.position,
      avatar: user.avatar,
      accessToken
    })
  }
  else res.status(400).json(['Такого пользователя не существует'])

});

module.exports = router;