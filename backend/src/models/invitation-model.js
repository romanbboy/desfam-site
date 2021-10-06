const {Schema, model} = require('mongoose')

const invitationSchema = new Schema({
  referrer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  referral: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: String,
  target: {
    type: Schema.Types.ObjectId,
    ref: 'Datebook',
    required: true
  },
});

invitationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = model('Invitation', invitationSchema)