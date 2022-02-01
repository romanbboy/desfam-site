const {Schema, model} = require('mongoose')

const notificationSchema = new Schema({
  date: Date,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  note: String
});

notificationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = model('Notification', notificationSchema)