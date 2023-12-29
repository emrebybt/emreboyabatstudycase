const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    name: String,
    description: String,
    logoUrl: String,
    type: String,
    branchCode: String,
    rating: Number,
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurantAddress"
    }],
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"menu"
    }]
})

module.exports = mongoose.model('restaurant', RestaurantSchema)