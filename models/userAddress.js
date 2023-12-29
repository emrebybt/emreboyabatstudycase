const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserAddressSchema = new Schema({
    name:String,
    city: String,
    district: String,
    street: String,
    description: String
})

module.exports = mongoose.model('userAddress', UserAddressSchema)