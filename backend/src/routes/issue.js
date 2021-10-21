const moment = require('moment');
require('moment/locale/ru');
const {Router} = require('express');

const checkToken = require('../middleware/checkToken');
const checkParticipant = require('../middleware/checkParticipant');

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

  issue.save(async (err, issue) => {
    if (err) res.status(500).json('Не удалось создать задачу');
    else {
      Issue
        .populate(issue, {path: 'creator target datebook'})
        .then(issue => {
          res.status(200).json(issue);
        })
    }
  })
});

router.post('/get', checkToken, checkParticipant, async (req, res) => {
  const {idDatebook, date} = req.body;

  let startDay = moment(date).startOf('date');
  let endDay = moment(date).endOf('date');
  
  const issues = await Issue.find({
    datebook: idDatebook,
    date: {$gte: startDay, $lte: endDay}
  }).populate('datebook creator target');
  
  res.status(200).json(issues);
});

// status
router.put('/:id/status', checkToken, async (req, res) => {
  const user = req.user;

  const issue = await Issue.findById(req.params.id);
  
  if ([issue.creator.toString(), issue.target.toString()].includes(user.id)) {
    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, {status: !issue.status}, {new: true}).populate('creator datebook target');
    res.status(200).json(updatedIssue);
  } else {
    res.status(400).json('Ты не можешь менять эту задачу');
  }
});

// delete
router.delete('/:id', checkToken, async (req, res) => {
  const user = req.user;

  const issue = await Issue.findById(req.params.id);

  if (issue.creator.toString() === user.id) {
    await Issue.findByIdAndDelete(req.params.id);
    res.status(200).json();
  } else {
    res.status(400).json('Ты не можешь удалить эту задачу');
  }
});

// edit
router.put('/:id', checkToken, async (req, res) => {
  const user = req.user;

  const issue = await Issue.findById(req.params.id);

  if (issue.creator.toString() === user.id) {
    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, {content: req.body.content}, {new: true}).populate('creator datebook target');
    res.status(200).json(updatedIssue);
  } else {
    res.status(400).json('Ты не можешь редактировать эту задачу');
  }
});

module.exports = router