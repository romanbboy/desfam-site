const {Router} = require('express');

const checkToken = require('../middleware/checkToken');

const Invitation = require('../models/invitation-model');

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
})

module.exports = router