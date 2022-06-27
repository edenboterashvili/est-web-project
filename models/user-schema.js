const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is missing'],
    },
    password: {
        type: String,
        required: [true, 'password is missing'],
    },
    type: {
        type: String,
        default: 'user',
    },
});
const User = mongoose.model('users', userSchema);
module.exports = { User };
