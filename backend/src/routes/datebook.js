const {Router} = require('express')

const checkToken = require('../middleware/checkToken')

const Datebook = require('../models/datebook-model');
const Invitation = require('../models/invitation-model');
const Issue = require('../models/issue-model');

const router = Router();

router.post('/add', checkToken, async (req, res) => {
  const {_id: id} = req.user
  const quantityDatebooks = await Datebook.find({creator: id}).exec();

  if (quantityDatebooks.length >= 3) {
    res.status(500).json('Можно быть СОЗДАТЕЛЕМ не более 3-х задачников')
  } else {
    const participants = [id]
    const datebook = await Datebook({title: req.body.datebook, creator: id, participants});
    datebook.save((err, datebook) => {
      if (err) res.status(500).json('Не удалось создать задачник')
      else{
        let {_id: id, title, creator, participants} = datebook
        res.status(200).json({id, title, creator, participants})
      }
    })
  }
})

router.get('/getAll', checkToken, async (req, res) => {
  const {_id: id_user} = req.user;
  const datebooks = await Datebook.find({participants: {$in: id_user}}).exec();

  res.status(200).json(datebooks)
})

router.get('/:id', checkToken, async (req, res) => {
  const datebook = await Datebook.findById(req.params.id).populate('participants', '-password');

  // Зайти в ежедневник может только пользователь в списке участников ежедневника
  if (!datebook.participants.find(el => el.id === req.user.id)){
    res.sendStatus(301);
    return;
  }

  res.status(200).json(datebook)
});

// удаление участника
router.delete('/:id_datebook/delete/participant/:id_participant', checkToken, async (req, res) => {
  const datebook = await Datebook.findById(req.params.id_datebook);

  if (datebook.creator.toString() === req.user.id) {
    await Datebook.findByIdAndUpdate(req.params.id_datebook, { $pull: { 'participants': req.params.id_participant } }, {new: true});
    res.status(200).json('Участник удален');
  } else {
    res.status(500).json('Ты не создатель ежедневника');
  }
});

// покинуть задачник
router.get('/:id/escape', checkToken, async (req, res) => {
  const user = req.user;
  const datebook = await Datebook.findById(req.params.id);

  if (datebook.participants.includes(user.id)) {
    await Datebook.findByIdAndUpdate(req.params.id, { $pull: { 'participants': user.id } });
    res.status(200).json();
  } else {
    res.status(400).json('Ты не участник задачника');
  }
});

// удалить задачник
router.delete('/:id', checkToken, async (req, res) => {
  const datebook = await Datebook.findById(req.params.id);

  if (datebook.creator.toString() === req.user.id) {
    await Invitation.deleteMany({target: datebook.id, referrer: req.user.id});
    await Issue.deleteMany({datebook: datebook.id});
    await Datebook.findByIdAndDelete(datebook.id);

    res.status(200).json('Задачник удален');
  } else {
    res.status(400).json('Ты не создатель задачника');
  }
});

module.exports = router
