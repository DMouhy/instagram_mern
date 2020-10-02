const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const profile_Collection = require('./Profile_model');

const post_Shema = new mongoose.Schema({
    posted_by: {
        type: ObjectId,
        ref: profile_Collection
    },
    username: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    caption: String,
    likes: [
        {
            type: ObjectId,
            ref: profile_Collection
        }
    ],
    comments: [
        {
            comment: {
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                required: true
            },
            posted_by: {
                type: ObjectId,
                ref: profile_Collection
            }
        }
    ]
})

const post_Collection = mongoose.model('posts', post_Shema);

module.exports = post_Collection;