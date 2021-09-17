const {Schema, model} = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  position: String,
  avatar: String,
  password: {
    type: String,
    required: true,
    minLength: 5
  }
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) { delete ret._id }
});

module.exports = model('User', userSchema)