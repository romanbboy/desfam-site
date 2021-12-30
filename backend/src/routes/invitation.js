const {Router} = require('express');

const checkToken = require('../middleware/checkToken');

const Invitation = require('../models/invitation-model');
const Datebook = require('../models/datebook-model');

const router = Router();

router.post('/', checkToken, async (req, res) => {
  const user = req.user;
  const {referral, datebook} = req.body;

  const existInvitation = await Invitation.findOne({referral: referral.id, target: datebook.id}).populate('referral');

  if (existInvitation) {
    res.status(200).json(`${existInvitation.referral.username} уже приглашен`);
  } else {
    const invitation = new Invitation({
      referrer: user.id,
      referral: referral.id,
      type: 'datebook',
      target: datebook.id
    });

    invitation.save((err, data) => {
      if (err) res.status(500).json('Ошибка сервера');
      else res.status(201).json(`${referral.username} приглашен`)
    })
  }
});

router.get('/', checkToken, async (req, res) => {
  const user = req.user;

  const invitations = await Invitation.find({referral: user.id}).populate('referrer referral target');
  res.status(200).json(invitations);
});

router.get('/:id/accept', checkToken, async (req, res) => {
  const user = req.user;
  const invitation = await Invitation.findOne({_id: req.params.id, referral: user.id});

  if (invitation) {
    const datebook = await Datebook.findById(invitation.target);

    if (datebook) {
      if (!datebook.participants.includes(user.id)) {
        const updatedDatebook = await Datebook.findByIdAndUpdate(invitation.target, {$addToSet: { participants: user.id }}, {new: true});
        await Invitation.findByIdAndDelete(req.params.id);
        res.status(200).json(updatedDatebook);
      } else {
        res.status(500).json('Ты уже являешься участником ежедневника');
      }
    } else {
      res.status(500).json('Задачник не найден');
    }
  } else {
    res.status(500).json('Не твое приглашение');
  }
});

router.delete('/:id/reject', checkToken, async (req, res) => {
  const user = req.user;
  await Invitation.findOneAndDelete({_id: req.params.id, referral: user.id});
  res.status(200).json('Предложение отклонено');
});

module.exports = router
