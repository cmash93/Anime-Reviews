const { Schema, model } = require('mongoose');

const commentSchema = new Schema({

    commentText: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
            var date = new Date(timestamp);
            return date.toLocaleString();
        }
    },
    username: {
        type: String,
        required: true
    },
},
{ timestamps: true });

const Comment = model('Comment', commentSchema);

module.exports = Comment;