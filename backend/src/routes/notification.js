const moment = require('moment');
const {Router} = require('express');

const checkToken = require('../middleware/checkToken');

const Notification = require('../models/notification-model');

const router = Router();

router.post('/', checkToken, async (req, res) => {
  const notification = await Notification({date: moment(), creator: req.user.id, note: req.body.note});
  notification.save((err, notification) => {
    if (err) res.status(500).json('Не удалось создать заметку')
    else res.status(200).json({notification})
  })
});

router.get('/', checkToken, async (req, res) => {
  const notifications = await Notification.find({creator: req.user.id}, null, {sort: {date: -1}});
  res.status(200).json({notifications});
});

router.delete('/:id', checkToken, async (req, res) => {
  const note = await Notification.findById(req.params.id);

  if (note.creator.toString() === req.user.id) {
    await Notification.findByIdAndDelete(note.id);
    res.status(200).json();
  }
  else res.status(400).json('Ты не можешь удалить заметку');
});

module.exports = router
