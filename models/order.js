const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu"
        },
        quantity: Number
    }],
    userAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userAddress"
    },
    totalPrice: Number,
    orderDate: Date,
    isComment: Boolean,
    isRating: Boolean
});

module.exports = mongoose.model('Order', OrderSchema);
