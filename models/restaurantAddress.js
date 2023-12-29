const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantAddressSchema = new Schema({
    city: String,
    district: String,
    street: String,
    location: String
})

module.exports = mongoose.model('restaurantAddress', RestaurantAddressSchema)