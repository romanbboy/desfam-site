const Datebook = require('../models/datebook-model');

const checkParticipant = async (req, res, next) => {
  const isParticipant = await Datebook.findOne({_id: req.body.idDatebook, participants: {$in: req.user.id}});
  
  if (isParticipant) next();
  else res.status(400).json('Ты не участник задачника');

}

module.exports = checkParticipant