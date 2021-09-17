const {Router} = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp')

const checkToken = require('../middleware/checkToken')
const uploadAvatar = require('../middleware/uploadAvatar')

const User = require('../models/user-model')

const router = Router();

router.get('/', checkToken, (req, res) => {
  const {_id: id, username, email, position, avatar} = req.user

  res.status(200).json({
    id, username, email, position, avatar,
    accessToken: req.headers.authorization
  })
})

router.put('/', checkToken, uploadAvatar.single('avatar'), async (req, res) => {
  let updateFields = {
    username: req.body.username,
    position: req.body.position
  }

  if (req.body.password) {
    // Шифруем пароль
    const hash = crypto.createHmac('sha256', req.body.password);
    updateFields['password'] = hash.update('desfam').digest('hex');
  }

  if (req.file) {
    // Удаляем старую аву
    let pathCurrentAvatar = path.resolve(__dirname, `../../..${req.user.avatar}`);

    fs.stat(pathCurrentAvatar, (err, stats) => {
      if (err) console.log("Файл не найден");
      else fs.unlinkSync(pathCurrentAvatar);
    });

    // Сжимаем изображение временного файла
    const pathTmpImg = path.resolve(__dirname, `../../../files/avatars/${req.file.filename}`)
    const img = sharp(pathTmpImg);

    let metadata = await img.metadata();

    let nameImg = req.file.filename.replace(/\.[^.]+$/, "");
    let pathImg = path.resolve(__dirname, `../../../files/avatars/${nameImg}_desfam.${metadata.format}`);

    await img
      .toFormat(metadata.format, {quality: 70})
      .toFile(pathImg)
      .then(() => updateFields['avatar'] = `/files/avatars/${nameImg}_desfam.${metadata.format}`)
      .catch(() => console.log('-----> ', 'Не удалось сохранить изображение'))

    // Удаляем временный файл
    fs.unlink(pathTmpImg, (err) => {
      if (err) console.log('-----> ', 'Не удалилось временное изображение');
    });
  }

  User.findByIdAndUpdate(
    req.user.id,
    updateFields,
    {new: true},
    (err, user) => {
      if (err) res.status(500).json(['Ошибка'])
      else {
        const {_id: id, username, email, position, avatar} = user;
        res.status(200).json({
          id, username, email, position, avatar,
          accessToken: req.headers.authorization
        })
      }
    }
  )
})

module.exports = router