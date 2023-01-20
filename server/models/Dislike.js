const { Schema } = require('mongoose');

const dislikeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
},
{ timestamps: true });

const Dislike = model('Dislike', dislikeSchema);

module.exports = { Dislike }