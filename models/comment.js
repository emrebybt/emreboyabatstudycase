const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    textContent: String,
    rating: String,
    restaurant: {
        type: Schema.Types.ObjectId,
        ref:'restaurant'
    },
    commentUser : {
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref:'order'
    }
})

module.exports = mongoose.model('comment', CommentSchema)