const {Router} = require('express')

const checkToken = require('../middleware/checkToken')

const Datebook = require('../models/datebook-model')

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
  const datebook = await Datebook.findById(req.params.id);

  // Зайти в ежедневник может только пользователь в списке участников ежедневника
  if (!datebook.participants.includes(req.user._id)){
    res.sendStatus(301);
    return;
  }

  res.status(200).json(datebook)
})

module.exports = router