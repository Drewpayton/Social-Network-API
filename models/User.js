const { Schema, model } = require('mongoose');
import emailVal from '../helpers/validateEmail'

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Username is required",
            trim: true
        },
        email: {
           type: String,
           required: "Email is required",
           unique: true,
           validate: [emailVal, 'Please fill a valid email address'],
           match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

        },
        thoughts: [thoughts],
        friends: [userSchema]
    }
);

const User = model('user', userSchema);

module.exports = User;