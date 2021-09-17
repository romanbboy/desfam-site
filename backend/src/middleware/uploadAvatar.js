const multer = require('multer');
const path = require('path');
const fs = require('fs')
const {slugify} = require('transliteration');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      fs.accessSync(path.resolve(__dirname, '../../../files/avatars'), fs.constants.F_OK);
    } catch (e) {
      fs.mkdirSync(path.join(path.resolve(__dirname, '../../../files/'), 'avatars'))
    }

    cb(null, path.resolve(__dirname, '../../../files/avatars'))
  },
  filename(req, file, cb) {
    let filename = file.originalname.split('.')[0] + Date.now() + '.' + file.originalname.split('.').pop();
    cb(null, slugify(filename, { lowercase: false, separator: '_' }))
  }
});

module.exports = multer({
  storage
})