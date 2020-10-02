const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const user_Collection = require('./User_model');

const profile_Schema = new mongoose.Schema({
    user_profile: {
        type: ObjectId,
        ref: user_Collection
    },
    picture: { 
        type: String,
        default: 'https://res.cloudinary.com/dchnmxssq/image/upload/v1601118594/instagram_mern_images/profileimg_sugvm2.png'
     },
     following: [
        {
            type: ObjectId,
            ref: 'profiles'
        }
     ],
     followers: [
        {
            type: ObjectId,
            ref: 'profiles'
        }
     ]
})

const profile_Collection = mongoose.model('profiles', profile_Schema);

module.exports = profile_Collection;