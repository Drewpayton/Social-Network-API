const { Schema, model, Types } = require('mongoose');
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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals:true
        },
        id: false
    }
);

userSchema.virtual('friendCount')
    .get(function() {
        return this.friends.length
    })

const User = model('user', userSchema);

module.exports = User;