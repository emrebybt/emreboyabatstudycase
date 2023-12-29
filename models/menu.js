const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    productName: String,
    productDescription: String,
    productPrice: Number,
    productImageUrl: String,
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }
});

module.exports = mongoose.model('Menu', MenuSchema);
