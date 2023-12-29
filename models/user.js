const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    surname: String,
    username: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    profilPictureUrl: String,
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userAddress"
    }]
})

module.exports = mongoose.model('user', UserSchema)