const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },
    categories: {
        type: Array, // ['life', 'music', 'sport']
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);