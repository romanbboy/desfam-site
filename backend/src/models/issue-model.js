const {Schema, model} = require('mongoose')

const issueSchema = new Schema({
  date: Date,
  datebook: {
    type: Schema.Types.ObjectId,
    ref: 'Datebook',
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  target: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: Boolean,
  content: String
});

issueSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = model('Issue', issueSchema)