const { Schema, model } = require('mongoose');
const moment = require('moment');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatQuery => moment(formatQuery).format("MMM DD, YYYY [at] hh:mm a")
        },
        username: {
            type: String,
            required: true
        },
        reactions: []
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought