const {Router} = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const checkToken = require('../middleware/checkToken')
const uploadAvatar = require('../middleware/uploadAvatar')

const User = require('../models/user-model')

const router = Router();

// Работа с текущим пользователем
router.get('/current', checkToken, (req, res) => {
  const {id, username, email, position, avatar, expoToken} = req.user

  res.status(200).json({
    id, username, email, position, avatar, expoToken,
    accessToken: req.headers.authorization
  })
})

router.put('/current', checkToken, uploadAvatar.single('avatar'), async (req, res) => {
  let updateFields = {
    username: req.body.username,
    position: req.body.position
  }

  if (req.body.password) {
    // Шифруем пароль
    const hash = crypto.createHmac('sha256', req.body.password);
    updateFields['password'] = hash.update('desfam').digest('hex');
  }

  // Для аватарки
  if ((req.body.avatar && req.body.mobile) || req.file) {
    // Удаляем старую аву
    if (req.user.avatar) {
      let pathCurrentAvatar = path.resolve(__dirname, `../../..${req.user.avatar}`);

      fs.stat(pathCurrentAvatar, (err, stats) => {
        if (err) console.log("Файл не найден");
        else fs.unlinkSync(pathCurrentAvatar);
      });
    }

    let pathTmpImg, nameImg;

    // Вариант для web сайта
    if (req.file) {
      pathTmpImg = path.resolve(__dirname, `../../../files/avatars/${req.file.filename}`);
      nameImg = req.file.filename.replace(/\.[^.]+$/, "");
    }

    // Вариант для мобильного приложения
    if (req.body.avatar && req.body.mobile) {
      pathTmpImg = path.resolve(__dirname, `../../../files/avatars/avatar_mobile_tmp${+new Date()}.jpg`);
      nameImg = `ava_mobile${+new Date()}`;

      // сохраняем временный файл
      let buff = new Buffer(req.body.avatar, 'base64');
      fs.writeFileSync(pathTmpImg, buff);
    }

    const img = sharp(pathTmpImg);
    let metadata = await img.metadata();

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
      if (err) res.status(500).json('Ошибка')
      else {
        const {_id: id, username, email, position, avatar} = user;
        res.status(200).json({
          id, username, email, position, avatar,
          accessToken: req.headers.authorization
        })
      }
    }
  )
});

router.put('/expoToken', checkToken, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {expoToken: req.body.expoToken});
  res.status(200).json();
})

// Работа с пользователями
router.post('/findOne', async (req, res) => {
  const user = await User.findOne({[req.body.field]: req.body.val}, '-password -__v');

  if (user) res.status(200).json(user);
  else res.status(204).json('Пользователь не найден');
})

module.exports = router
