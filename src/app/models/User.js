const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    password: String,
    image: String,
    birthday: String,
    email: String,
    gender: String,
    hobby: String,
    description: String,
}, { timestamps: true });

module.exports = mongoose.model('User', User);
