const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    image: String,
    birthday: String,
    email: String,
    gender: String,
    hobby: String,
    description: String,
  });

module.exports = mongoose.model('User', User);
