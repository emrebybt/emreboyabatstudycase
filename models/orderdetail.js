const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    productName: String,
    productdescription: String,
    productPrice: Number,
    productImageUrl: String,
})

module.exports = mongoose.model('menu', MenuSchema)