const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: 0, 
  },
  nation: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    default: 'Not specified', 
  },
  image: {
    type: String,
    default: '', 
  },
  profession: {
    type: String,
    default: '', 
  },
  address: {
    type: String,
    default: '', 
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
