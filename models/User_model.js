const mongoose = require('mongoose');

const user_Schema = new mongoose.Schema({
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const user_Collection = mongoose.model('users', user_Schema)

module.exports = user_Collection;