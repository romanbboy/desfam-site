const moment = require('moment');
require('moment/locale/ru');
const {Router} = require('express');

const checkToken = require('../middleware/checkToken');

const Issue = require('../models/issue-model');

const router = Router();

router.post('/', checkToken, async (req, res) => {
  const user = req.user;
  const {datebook, target, content} = req.body;

  const issue = new Issue({
    // прибавляем 3 часа к дате, что бы соответствовало Московскому времени
    date: moment().add(3, 'h'),
    creator: user.id,
    status: false,
    datebook, target, content
  });

  issue.save((err, issue) => {
    if (err) res.status(500).json('Не удалось создать задачу');
    else res.status(200).json(issue);
  })
});

module.exports = router