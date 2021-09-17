const {Schema, model} = require('mongoose')

const datebookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

datebookSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = model('Datebook', datebookSchema)